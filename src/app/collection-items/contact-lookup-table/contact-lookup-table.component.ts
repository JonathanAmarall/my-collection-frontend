import { IContact } from './../models/IContact';
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { CollectionItemService } from '../services/collection-item.service';

@Component({
  templateUrl: './contact-lookup-table.component.html',
  styleUrls: ['./contact-lookup-table.component.scss'],
})
export class ContactLookupTableComponent
  extends AppComponentBase
  implements OnInit
{
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: MatPaginator;

  globalFilter: string = '';
  filter = new Subject<string>();

  displayedColumns: string[] = ['actions', 'fullName', 'email', 'phone'];
  totalCount: number;

  constructor(
    injector: Injector,
    private dialogRef: MatDialogRef<ContactLookupTableComponent>,
    private collectionItemService: CollectionItemService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.filter.pipe(debounceTime(300)).subscribe((filter) => {
      this.globalFilter = filter;
      this.loadContacts();
    });

    this.loadContacts();
  }

  loadContacts(event?: PageEvent): void {
    let pageIndex = 1;
    let pageSize = 5;
    if (event !== undefined) {
      pageSize = event.pageSize;
      pageIndex = event.pageIndex + 1;
    }

    this.collectionItemService
      .loadContacts(this.globalFilter, pageIndex, pageSize)
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.totalCount = res.totalCount;
        this.paginator.length = this.totalCount;
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  selectContact(contact: IContact): void {
    this.dialogRef.close(contact);
  }
}
