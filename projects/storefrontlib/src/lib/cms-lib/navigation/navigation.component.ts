import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnDestroy
} from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends AbstractCmsComponent
  implements OnDestroy {
  itemSubscription: Subscription;

  done = false;

  @Input() dropdownMode = 'list';
  @Input() node;

  constructor(
    protected cd: ChangeDetectorRef,
    private navigationService: NavigationService,
    protected store: Store<fromStore.CmsState>,
  ) {
    super(cd);
  }

  protected fetchData() {
    if (!this.component) {
      return;
    }
    const navigation = this.component.navigationNode
      ? this.component.navigationNode
      : this.component;

    this.itemSubscription = this.store
      .select(fromStore.itemsSelectorFactory(navigation.uid))
      .pipe(takeWhile(() => !this.done))
      .subscribe(items => {
        if (items === undefined) {
          this.navigationService.getNavigationEntryItems(navigation, true, []);
        } else {
          this.done = true;
          this.node = this.navigationService.createNode(navigation, items);
          if (!this.cd['destroyed']) {
            this.cd.detectChanges();
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.done = true;
      this.itemSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
}
