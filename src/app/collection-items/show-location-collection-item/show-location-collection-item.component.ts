import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/components/app-component-base.component';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionItemService } from '../services/collection-item.service';

@Component({
  templateUrl: './show-location-collection-item.component.html',
  styles: [
    `
      .mat-suffix-icon:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class ShowLocationCollectionItemComponent
  extends AppComponentBase
  implements OnInit
{
  $location: Observable<string>;
  /**
   *
   */
  constructor(
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ShowLocationCollectionItemComponent>,
    private collectionItemService: CollectionItemService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.$location = this.collectionItemService
      .getLocation(this.data)
      .pipe(map((l: any) => l.location));
  }

  close() {
    this.dialogRef.close();
  }
}
