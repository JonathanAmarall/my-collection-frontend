import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    injector: Injector,
    private dialogRef: MatDialogRef<CreateCollectionItemComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {}
}
