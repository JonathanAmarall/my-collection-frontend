import { EType } from './EType';
import { EStatus } from './EStatus';

export interface ICollectionItem {
  title: string;
  autor: string;
  quantity: number;
  edition?: string;
  itemType: EType;
  status: EStatus;
  location?: string;
}
