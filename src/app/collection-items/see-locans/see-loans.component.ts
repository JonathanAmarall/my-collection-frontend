import { IContact } from './../models/IContact';
import {
  Component,
  Inject,
  Injector,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  templateUrl: 'see-loans.component.html',
  styleUrls: ['./see-loans.component.scss'],
})
export class SeeLoandsComponent
  extends AppComponentBase
  implements AfterViewInit
{
  displayedColumns: string[] = ['fullName', 'email', 'phone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: IContact[],
    private dialogRef: MatDialogRef<SeeLoandsComponent>
  ) {
    super(injector);
  }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<IContact>(
    this.data
  );

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  close() {
    this.dialogRef.close();
  }
}
