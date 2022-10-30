import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../shared/components/app-component-base.component';

@Component({
  templateUrl: './collection-items.component.html',
  styleUrls: ['./collection-items.component.scss'],
})
export class CollectionItemsComponent
  extends AppComponentBase
  implements OnInit
{
  /**
   *
   */
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._notifyService.success({ msg: 'ola' });
  }
}
