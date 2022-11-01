import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { LocationFlatNode } from './models/LocationItemFlatNode';
import { TreeLocationService } from './services/tree-location.service';
import { DynamicDataSource } from './models/DynamicDataSource';
import { MatDialog } from '@angular/material/dialog';
import { ILocation } from './interfaces/ILocation';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { ITransferLocation } from './interfaces/ITransferLocation';
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
            .subscribe((res: LocationFlatNode[]) => {
              res.forEach((element) => {
                element.expandable = true;
                copyData.push(element);
              });
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
          this.treeLocationService.createRoot(data).subscribe(
            (res: LocationFlatNode[]) => {
              res.forEach((element) => {
                element.expandable = true;
                copyData.push(element);
              });
              this.dataSource.dataChange.next(copyData);
              this.dataSource.toggleNode(node, true);
            },
            (err) => this._notifyService.alert(err.error.message)
          );
        }
      });
  }

  update(node: LocationFlatNode) {
    // this.dialog
    //   .open(LocationFormDialogComponent, { data: { location: node } })
    //   .afterClosed()
    //   .subscribe((data: ILocation) => {
    //     if (data !== null && data !== undefined)
    //       this.treeLocationService.update(data).subscribe(
    //         (res) => {
    //           this.dataSource.updateNode(node.id, data);
    //           this.getOrRefreshTree();
    //           this.notifyService.info('Editado com sucesso!');
    //         },
    //         (err: any) => {
    //           this.notifyService.alert(err.error.message);
    //         }
    //       );
    //   });
  }

  delete(id: string) {
    // this.messageService
    //   .confirm('Atenção!', 'Deseja mesmo remover esta localização?')
    //   .afterClosed()
    //   .subscribe((remove) => {
    //     if (remove) {
    //       this.treeLocationService.delete(id).subscribe(
    //         () => {
    //           this.dataSource.removeNodeById(id);
    //           this.notifyService.info('Deletado com sucesso!');
    //         },
    //         (err) => this.messageService.alert('Ops!', err.error.message)
    //       );
    //     }
    //   });
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
