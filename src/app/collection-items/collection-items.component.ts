import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
    console.log(this.type);
    let pageIndex = 1;
    let pageSize = 5;
    console.log(event);
    if (event !== undefined) {
      pageSize = event.pageSize;
      pageIndex = event.pageIndex + 1;
    }

    this.collectionItemService
      .get(
        this.globalFilter,
        undefined,
        undefined,
        this.status,
        this.type,
        pageIndex,
        pageSize
      )
      .subscribe((collectionItems) => {
        console.log(collectionItems);

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
}
