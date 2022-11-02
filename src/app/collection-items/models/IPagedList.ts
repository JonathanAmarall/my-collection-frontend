import { ICollectionItem } from './ICollectionItem';

export interface IPagedList<T> {
  totalCount: number;
  data: T[];
}
