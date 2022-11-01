import { EIdentifycationType } from '../enums/EIdentifycationType';

export interface ILocation {
  id: string;
  initials: string;
  description: string;
  hasStock: boolean;
  quantity: number;
  parentId?: string;
  automaticallyGenerate: boolean;
  identifycationType: EIdentifycationType;
  level: number;
}
