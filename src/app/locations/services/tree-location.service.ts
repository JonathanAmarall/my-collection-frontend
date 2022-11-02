import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILocation } from '../interfaces/ILocation';
import { LocationFlatNode } from '../models/LocationItemFlatNode';

const BASE_URL = environment.baseUrls.server;

@Injectable({ providedIn: 'root' })
export class TreeLocationService {
  /**
   *
   */
  constructor(private http: HttpClient) {}
  initialData(): Observable<LocationFlatNode[]> {
    return this.getRoots();
  }

  getChildren(id: string): Observable<LocationFlatNode[]> {
    let url = BASE_URL + 'locations/' + id + '/childrens';

    return this.http
      .get<LocationFlatNode[]>(url)
      .pipe(
        map((x) =>
          x.map((data) => {
            data.expandable = true;
            return data;
          })
        )
      )
      .pipe(take(1));
  }

  isExpandable(node: string): boolean {
    return true;
  }

  addChildren(data: ILocation) {
    let url = BASE_URL + 'locations';
    return this.http.post(url, data).pipe(take(1));
  }

  createRoot(data: ILocation): Observable<LocationFlatNode> {
    let url = BASE_URL + 'locations';
    return this.http.post<LocationFlatNode>(url, data).pipe(take(1));
  }

  getRoots(): Observable<LocationFlatNode[]> {
    let url = BASE_URL + 'locations';
    return this.http
      .get<LocationFlatNode[]>(url)
      .pipe(
        map((x) =>
          x.map((data) => {
            data.expandable = true;
            data.level = 0;
            return data;
          })
        )
      )
      .pipe(take(1));
  }

  delete(id: string) {
    let url = BASE_URL + `locations/${id}`;
    return this.http.delete(url).pipe(take(1));
  }
}
