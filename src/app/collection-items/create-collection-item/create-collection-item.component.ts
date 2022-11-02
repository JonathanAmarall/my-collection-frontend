import { ICollectionItem } from './../models/ICollectionItem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectionItemService } from './../services/collection-item.service';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';

@Component({
  selector: 'app-create-collection-item',
  templateUrl: './create-collection-item.component.html',
  styleUrls: ['./create-collection-item.component.scss'],
})
export class CreateCollectionItemComponent
  extends AppComponentBase
  implements OnInit
{
  title: string = 'Cadastrar Item';

  form: FormGroup = this._formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    autor: ['', [Validators.required, Validators.maxLength(100)]],
    quantity: [
      '',
      [Validators.required, Validators.min(1), Validators.maxLength(100)],
    ],
    edition: [''],
    itemType: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<CreateCollectionItemComponent>,
    private collectionItemService: CollectionItemService,
    private _formBuilder: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.data) this.title = 'Editar Item';
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    let data: ICollectionItem = this.form.getRawValue();
    data.itemType = +data.itemType;

    if (!this.data) {
      this.collectionItemService.create(data).subscribe({
        next: () => {
          this._notifyService.success({ msg: 'Criado com sucesso!' });
          this.close();
        },
        error: () => this._notifyService.alert({ msg: 'Falha ao salvar' }),
      });
    }
  }
}
