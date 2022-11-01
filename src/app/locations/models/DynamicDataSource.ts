import {
  CollectionViewer,
  DataSource,
  SelectionChange,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ILocation } from '../interfaces/ILocation';
import { TreeLocationService } from '../services/tree-location.service';
import { LocationFlatNode } from './LocationItemFlatNode';

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<LocationFlatNode> {
  dataChange = new BehaviorSubject<LocationFlatNode[]>([]);

  get data(): LocationFlatNode[] {
    return this.dataChange.value;
  }

  set data(value: LocationFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<LocationFlatNode>,
    private _database: TreeLocationService
  ) {
    this.getRootList(_database);
  }

  private getRootList(_database: TreeLocationService) {
    _database.getRoots().subscribe((roots) => {
      this.data = roots;
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<LocationFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change) => {
      if (
        (change as SelectionChange<LocationFlatNode>).added ||
        (change as SelectionChange<LocationFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<LocationFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors
   * É chamado toda vez que é colapsado ou minimizado a arvore
   * Após chama o método toggleNode
   */
  handleTreeControl(change: SelectionChange<LocationFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach((node) => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: LocationFlatNode, expand: boolean) {
    this.clearChildrens(node);
    node.isLoading = true;

    this._database.getChildren(node.id).subscribe((childrens) => {
      const children = childrens;
      const index = this.data.indexOf(node);

      if (!children.length || index < 0) {
        // If no children, or cannot find the node, no op
        node.isLoading = false;
        this._treeControl.collapse(node);
        return;
      }

      if (expand) {
        const nodes = children.map(
          (node) =>
            new LocationFlatNode(
              node.id,
              node.initials,
              node.description,
              node.level,
              this._database.isExpandable(node.initials),
              node.parentId
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }

  /** Limpa todos os filhos de determinado nó da árvore */
  clearChildrens(node: LocationFlatNode) {
    let listChildrensOfRemove = this.data.filter((x) => x.parentId == node.id);
    listChildrensOfRemove.forEach((x) => {
      let index = this.data.findIndex((i) => i == x);
      this.data.splice(index, 1);
    });
    this.dataChange.next(this.data);
  }

  /** Remove o nó no qual ID foi passado por parametro */
  removeNodeById(nodeId: string) {
    let i = this.data.findIndex((x) => x.id == nodeId);
    this.data.splice(i, 1);
    this.dataChange.next(this.data);
  }

  updateNode(nodeId: string, data: ILocation) {
    let i = this.data.findIndex((x) => x.id == nodeId);
    this.data[i].initials = data.initials.toUpperCase();
    this.data[i].description = data.description;
  }
}
