import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { ILocation } from '../interfaces/ILocation';

@Component({
  templateUrl: './location-form-dialog.component.html',
  styleUrls: ['./location-form-dialog.component.scss'],
})
export class LocationFormDialogComponent
  extends AppComponentBase
  implements OnInit
{
  formGroup: FormGroup = this.formBuilder.group({
    id: [],
    initials: ['', [Validators.required, Validators.maxLength(7)]],
    description: ['', [Validators.required, Validators.maxLength(20)]],
    quantity: [1, [Validators.required, Validators.max(20)]],
    parentId: [],
  });

  txtButton: string = 'GERAR LOCALIZAÇÃO';
  isEdit: boolean = false;

  /**
   *
   */
  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LocationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.data?.location !== undefined) {
      this.formGroup.patchValue(this.data.location);
    }

    if (this.data?.parentId !== undefined) {
      // this.formGroup.get('parentId').setValue(this.data.parentId);
    }
  }

  save() {
    const data: ILocation = this.formGroup.getRawValue();
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}
