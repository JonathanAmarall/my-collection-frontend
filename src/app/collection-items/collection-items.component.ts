import { ILocation } from './../locations/interfaces/ILocation';
import { ShowLocationCollectionItemComponent } from './show-location-collection-item/show-location-collection-item.component';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject } from 'rxjs';
import { AppComponentBase } from '../shared/components/app-component-base.component';

import { EStatus } from './models/EStatus';
import { EType } from './models/EType';
import { ICollectionItem } from './models/ICollectionItem';
import { CollectionItemService } from './services/collection-item.service';
import { LandCollectionItemComponent } from './land-collection-item/land-collection-item.component';
import { SelectListLocationCollectionItemComponent } from './select-list-location-collection-item/select-list-location-collection-item.component';

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
    'actions',
    'title',
    'autor',
    'quantity',
    'edition',
    'itemType',
    'status',
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
    private _collectionItemService: CollectionItemService,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.filter.pipe(debounceTime(300)).subscribe((filter) => {
      this.globalFilter = filter;
      this.loadCollectionItems();
    });

    this.loadCollectionItems();
  }

  loadCollectionItems(event?: PageEvent) {
    let pageIndex = 1;
    let pageSize = 5;
    if (event !== undefined) {
      pageSize = event.pageSize;
      pageIndex = event.pageIndex + 1;
    }

    this._collectionItemService
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

  sortChange(sortState: Sort) {
    console.log(sortState);
    this.sortField = sortState.active;
    this.sortOrder = sortState.direction;

    this.loadCollectionItems();
  }

  iCanLend(status: EStatus): boolean {
    return status == EStatus.AVAILABLE;
  }

  showLocation(locationId: string): void {
    this._dialog.open(ShowLocationCollectionItemComponent, {
      data: locationId,
      width: '400px',
    });
  }

  landCollectionItem(id: string) {
    this._dialog
      .open(LandCollectionItemComponent, {
        data: id,
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => this.loadCollectionItems());
  }

  setLocation(id: string) {
    this._dialog
      .open(SelectListLocationCollectionItemComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((location: ILocation) => {
        if (location) {
          this._collectionItemService.setLocation(location.id, id).subscribe({
            next: () => {
              console.log(
                'Localização adicionada com sucesso!Localização adicionada com sucesso!'
              );
              this._notifyService.success({
                msg: 'Localização adicionada com sucesso!',
              });
              this.loadCollectionItems();
            },
          });
        }
      });
  }
}
