import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/ILocation';

const BASE_URL = environment.baseUrls.server;

@Injectable()
export class SelectListLocationCollectionItemService {
  locations: ILocation[] = [];
  /**
   *
   */
  constructor(private _http: HttpClient) {}

  loadInitRoots(filter?: string) {
    let url = BASE_URL + 'locations';

    if (filter != undefined && filter != null && filter != '') {
      url += `?globalFilter=${filter}`;
    }

    return this._http.get<ILocation[]>(url).pipe(take(1));
  }

  loadChildrensLocation(locationId: string) {
    let url = BASE_URL + `locations/${locationId}/childrens`;
    return this._http.get<ILocation[]>(url).pipe(take(1));
  }
}
