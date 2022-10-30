import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateCollectionItemComponent } from './create-collection-item/create-collection-item.component';
import { CollectionItemsComponent } from './collection-items.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionItemsRoutingModule {}
