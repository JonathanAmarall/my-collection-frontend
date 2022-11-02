import { ICollectionItem } from './../models/ICollectionItem';
import { ILendCollectionItem } from './../models/ILendCollectionItem';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { environment } from './../../../environments/environment';
import { IPagedList } from '../models/ICollectionItemPaged';
import { IContact } from '../models/IContact';
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
  ): Observable<IPagedList<ICollectionItem>> {
    let url =
      BASE_URL +
      `collection-items?pageNumber=${pageNumber}&pageSize=${pageSize}&`;

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

    return this._http.get<IPagedList<ICollectionItem>>(url).pipe(take(1));
  }

  getLocation(locationId: string): Observable<string> {
    let url = BASE_URL + `collection-items/${locationId}/location`;
    return this._http.get<string>(url).pipe(take(1));
  }

  lend(id: string, data: ILendCollectionItem) {
    let url = BASE_URL + `collection-items/${id}/lend`;
    return this._http.post(url, data).pipe(take(1));
  }

  loadContacts(globalFilter: string, pageNumber: number, pageSize: number) {
    let url =
      BASE_URL +
      `collection-items/contacts?pageNumber=${pageNumber}&pageSize=${pageSize}&`;

    if (globalFilter != undefined && globalFilter != '') {
      url += `globalFilter=${globalFilter}&`;
    }

    return this._http.get<IPagedList<IContact>>(url).pipe(take(1));
  }
}
