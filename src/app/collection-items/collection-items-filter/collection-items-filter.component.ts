import { Component, Inject, Optional, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';

@Component({
  templateUrl: './collection-items-filter.component.html',
  selector: 'collection-filters',
})
export class CollectionItemsFilterComponent
  extends AppComponentBase
  implements OnInit
{
  form: FormGroup = this._formBuilder.group({
    status: [],
    type: [],
  });

  constructor(
    private _formBuilder: FormBuilder,
    injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  ngOnInit(): void {}
}
