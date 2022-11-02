import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CollectionItemService } from './../services/collection-item.service';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { ContactLookupTableComponent } from '../contact-lookup-table/contact-lookup-table.component';

export interface ILendCollectionItem {
  collectionItemId: string;
  contactId: string;
  fullName: string;
  email: string;
  phone: string;
}

@Component({
  templateUrl: './land-collection-item.component.html',
  styles: [
    `
      .input-full {
        width: 100%;
      }

      .mat-icon {
        transform: scale(1.3);
        margin-right: 15px;
      }

      .mat-icon:hover {
        cursor: pointer;
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
    @Inject(MAT_DIALOG_DATA) public collectionItemId: string,
    private dialogRef: MatDialogRef<LandCollectionItemComponent>,
    private collectionItemService: CollectionItemService,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      collectionItemId: [
        this.collectionItemId,
        [Validators.required, Validators.minLength(3)],
      ],
      contactId: [null],
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      phone: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const data: ILendCollectionItem = this.form.getRawValue();
    this.collectionItemService.lend(this.collectionItemId, data).subscribe({
      next: () => {
        this._notifyService.success({ msg: 'Emprestado com sucesso!' });
        this.close();
      },
      error: () =>
        this._notifyService.alert({ msg: 'Falha ao emprestar item' }),
    });
  }

  openContacts() {
    this._dialog
      .open(ContactLookupTableComponent, { width: '700px' })
      .afterClosed()
      .subscribe((contact) => {
        if (contact) {
          this.form.patchValue(contact);
        }
      });
  }

  clearForm() {
    this.form.reset();
    this.form.setValue({ collectionItemId: this.collectionItemId });
  }
}
