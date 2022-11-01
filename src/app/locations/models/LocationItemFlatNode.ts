export class LocationFlatNode implements ILocationFlatNode {
  childrens?: LocationFlatNode[];
  createdAt?: Date;
  updatedAt?: Date;
  constructor(
    public id: string,
    public initials: string,
    public description: string,
    public level = 1,
    public expandable: boolean,
    public parentId: string,
    public isLoading = false
  ) {}
}

interface ILocationFlatNode {
  id: string;
  initials: string;
  description: string;
  childrens?: ILocationFlatNode[];
  level: number;
  parentId?: string;
}
