import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionItemsRoutingModule } from './collection-items.routing.module';
import { CreateCollectionItemComponent } from './create-collection-item/create-collection-item.component';
import { CollectionItemsComponent } from './collection-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [CreateCollectionItemComponent, CollectionItemsComponent],
  imports: [
    CommonModule,
    CollectionItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class CollectionItemsModule {}
