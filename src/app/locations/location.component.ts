import { Component, Injector } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { LocationFlatNode } from './models/LocationItemFlatNode';
import { TreeLocationService } from './services/tree-location.service';
import { DynamicDataSource } from './models/DynamicDataSource';
import { MatDialog } from '@angular/material/dialog';
import { ILocation } from './interfaces/ILocation';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { LocationFormDialogComponent } from './location-form-dialog/location-form-dialog.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent extends AppComponentBase {
  constructor(
    private treeLocationService: TreeLocationService,
    private dialog: MatDialog,
    injector: Injector
  ) {
    super(injector);

    this.getOrRefreshTree();
  }

  treeControl: FlatTreeControl<LocationFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: LocationFlatNode) => node.level;

  isExpandable = (node: LocationFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: LocationFlatNode) => _nodeData.expandable;

  createNewRoot() {
    this.dialog
      .open(LocationFormDialogComponent)
      .afterClosed()
      .subscribe((data: ILocation) => {
        if (data !== null && data !== undefined) {
          let copyData = this.dataSource.dataChange.value;
          this.treeLocationService
            .createRoot(data)
            .subscribe((res: LocationFlatNode) => {
              res.expandable = true;
              copyData.push(res);
              this.dataSource.dataChange.next(copyData);
            });
        }
      });
  }

  addChildren(node: LocationFlatNode) {
    this.dialog
      .open(LocationFormDialogComponent, { data: { parentId: node.id } })
      .afterClosed()
      .subscribe((data: ILocation) => {
        if (data !== null && data !== undefined) {
          let copyData = this.dataSource.dataChange.value;
          data.level = +node.level + 1;

          this.treeLocationService
            .createRoot(data)
            .subscribe((res: LocationFlatNode) => {
              res.expandable = true;
              copyData.push(res);

              this.dataSource.dataChange.next(copyData);
              this.dataSource.toggleNode(node, true);
            });
        }
      });
  }

  delete(id: string) {
    this.treeLocationService.delete(id).subscribe({
      next: () => {
        this.dataSource.removeNodeById(id);
        this._notifyService.info({ msg: 'Deletado com sucesso!' });
      },
      error: (err) => {
        this._notifyService.alert({ msg: err.error.message });
      },
    });
  }

  private getOrRefreshTree(): void {
    this.treeControl = new FlatTreeControl<LocationFlatNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new DynamicDataSource(
      this.treeControl,
      this.treeLocationService
    );
  }
}
