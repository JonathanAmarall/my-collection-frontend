import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { environment } from './../../../environments/environment';
import { ICollectionitemPaged } from '../models/ICollectionItemPaged';

const BASE_URL = environment.baseUrls.server;

@Injectable({ providedIn: 'root' })
export class CollectionItemService {
  /**
   *
   */
  constructor(private _http: HttpClient) {}

  get(
    globalFilter?: string,
    sortOrder?: string,
    sortField?: string,
    status?: number,
    type?: number,
    pageNumber: number = 1,
    pageSize: number = 5
  ): Observable<ICollectionitemPaged> {
    let url =
      BASE_URL +
      `collection-items?pageNumber=${pageNumber}&pageSize=${pageSize}&`;
    console.log(globalFilter);

    if (globalFilter != undefined && globalFilter != '') {
      url += `globalFilter=${globalFilter}&`;
    }

    if (status) {
      url += `status=${status}&`;
    }

    if (type) {
      url += `type=${type}&`;
    }

    if (sortOrder != undefined && sortField != undefined) {
      url += `sortOrder=${sortOrder}&sortField=${sortField}&`;
    }

    return this._http.get<ICollectionitemPaged>(url).pipe(take(1));
  }
}
