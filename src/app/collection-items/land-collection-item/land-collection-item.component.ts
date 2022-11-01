import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './land-collection-item.component.html',
  styles: [
    `
      .input-full {
        width: 100%;
      }
    `,
  ],
})
export class LandCollectionItemComponent
  extends AppComponentBase
  implements OnInit
{
  form: FormGroup;
  /**
   *
   */
  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<LandCollectionItemComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      collectionItemId: [this.data, Validators.required],
      contactId: [''],
      fullName: ['', Validators.maxLength(100)],
      email: ['', Validators.email],
      phone: [''],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {}
}
