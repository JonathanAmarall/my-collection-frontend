import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { ILocation } from '../models/ILocation';
import { SelectListLocationCollectionItemService } from './select-list-location-collection-item.service';

@Component({
  templateUrl: './select-list-location-collection-item.component.html',
  providers: [SelectListLocationCollectionItemService],
})
export class SelectListLocationCollectionItemComponent implements OnInit {
  locations$: Observable<ILocation[]>;
  titleLocation: string = 'Localizações';
  hasStock: boolean = true;
  currentLocation: ILocation;

  constructor(
    private _locationCollectionItemService: SelectListLocationCollectionItemService,
    private _dialogRef: MatDialogRef<SelectListLocationCollectionItemComponent>
  ) {}

  ngOnInit(): void {
    this.locations$ = this._locationCollectionItemService.loadInitRoots();
  }

  loadChildrensLocation(location: ILocation) {
    this.titleLocation = `${location.description} - ${location.initials}`;
    this.currentLocation = location;

    this.locations$ = this._locationCollectionItemService.loadChildrensLocation(
      location.id
    );
  }

  close() {
    this._dialogRef.close();
  }

  selectCurrentLocation(location: ILocation) {
    this._dialogRef.close(location);
  }
}
