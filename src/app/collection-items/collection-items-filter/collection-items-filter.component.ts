import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './collection-items-filter.component.html',
  selector: 'collection-filters',
})
export class CollectionItemsFilterComponent {
  contructor(
    private _formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {}
}
