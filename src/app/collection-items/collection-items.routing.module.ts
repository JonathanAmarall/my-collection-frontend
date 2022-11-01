import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
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
