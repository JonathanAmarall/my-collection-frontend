import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'locations',
    loadChildren: () =>
      import('./locations/locations.module').then((l) => l.LocationsModule),
  },
  {
    path: 'collection-items',
    loadChildren: () =>
      import('./collection-items/collection-items.module').then(
        (c) => c.CollectionItemsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
