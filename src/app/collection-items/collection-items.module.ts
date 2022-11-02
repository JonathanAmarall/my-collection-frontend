import { MatListModule } from '@angular/material/list';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { ShowLocationCollectionItemComponent } from './show-location-collection-item/show-location-collection-item.component';
import { LandCollectionItemComponent } from './land-collection-item/land-collection-item.component';
import { NgxMaskModule } from 'ngx-mask';
import { ContactLookupTableComponent } from './contact-lookup-table/contact-lookup-table.component';
import { SelectListLocationCollectionItemComponent } from './select-list-location-collection-item/select-list-location-collection-item.component';
import { SeeLoandsComponent } from './see-locans/see-loans.component';

@NgModule({
  declarations: [
    CreateCollectionItemComponent,
    CollectionItemsComponent,
    ShowLocationCollectionItemComponent,
    LandCollectionItemComponent,
    ContactLookupTableComponent,
    SelectListLocationCollectionItemComponent,
    SeeLoandsComponent,
  ],
  imports: [
    CommonModule,
    CollectionItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatMenuModule,
    NgxMaskModule.forRoot(),
    MatListModule,
  ],
})
export class CollectionItemsModule {}
