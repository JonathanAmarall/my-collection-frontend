import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject } from 'rxjs';
import { AppComponentBase } from '../shared/components/app-component-base.component';

import { EStatus } from './models/EStatus';
import { EType } from './models/EType';
import { ICollectionItem } from './models/ICollectionItem';
import { CollectionItemService } from './services/collection-item.service';

@Component({
  templateUrl: './collection-items.component.html',
  styleUrls: ['./collection-items.component.scss'],
})
export class CollectionItemsComponent
  extends AppComponentBase
  implements OnInit
{
  dataSource: MatTableDataSource<ICollectionItem> = new MatTableDataSource();

  @ViewChild('paginator') paginator: MatPaginator;

  globalFilter: string = '';
  filter = new Subject<string>();

  displayedColumns: string[] = [
    'title',
    'autor',
    'quantity',
    'edition',
    'itemType',
    'status',
    'location',
  ];
  totalCount: number = 0;

  type: EType | undefined;
  status: EStatus | undefined;
  sortOrder: string | undefined;
  sortField: string | undefined;
  /**
   *
   */
  constructor(
    injector: Injector,
    private collectionItemService: CollectionItemService
  ) {
    super(injector);
  }

  loadCollectionItems(event?: PageEvent) {
    let pageIndex = 1;
    let pageSize = 5;
    if (event !== undefined) {
      pageSize = event.pageSize;
      pageIndex = event.pageIndex + 1;
    }

    this.collectionItemService
      .get(
        this.globalFilter,
        this.sortOrder,
        this.sortField,
        this.status,
        this.type,
        pageIndex,
        pageSize
      )
      .subscribe((collectionItems) => {
        this.dataSource.data = collectionItems.data;
        this.totalCount = collectionItems.totalCount;
        this.paginator.length = this.totalCount;
      });
  }

  printStatus(status: number): string {
    return EStatus[status];
  }

  printType(type: number): string {
    return EType[type];
  }

  printTitle(title: string): string {
    if (title.length > 50) title = `${title.substring(0, 50)}...`;

    return title;
  }

  ngOnInit(): void {
    this.filter.pipe(debounceTime(300)).subscribe((filter) => {
      this.globalFilter = filter;
      this.loadCollectionItems();
    });

    this.loadCollectionItems();
  }

  sortChange(sortState: Sort) {
    console.log(sortState);
    this.sortField = sortState.active;
    this.sortOrder = sortState.direction;

    this.loadCollectionItems();
  }
}
