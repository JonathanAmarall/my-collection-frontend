import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILocation } from '../interfaces/ILocation';
import { LocationFlatNode } from '../models/LocationItemFlatNode';
import { ILocationProductTotalizers } from '../interfaces/ILocationProductTotalizers';
import { ITransferLocation } from '../interfaces/ITransferLocation';

const BASE_URL = environment.baseUrls.server;
/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({ providedIn: 'root' })
export class TreeLocationService {
  /**
   *
   */
  constructor(private http: HttpClient) {}
  /** Initial data from database */
  initialData(): Observable<LocationFlatNode[]> {
    return this.getRoots();
  }

  getChildren(id: string): Observable<LocationFlatNode[]> {
    // Realizar requisição no backend para buscar filhos deste nó
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
