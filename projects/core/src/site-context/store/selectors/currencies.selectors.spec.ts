import { TestBed } from '@angular/core/testing';
import { Store, select, StoreModule } from '@ngrx/store';

import { StateWithSiteContext } from '../state';

import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/currencies.selectors';
import { SiteContextStoreModule } from '../site-context-store.module';
import { EffectsModule } from '@ngrx/effects';

describe('Currencies Selectors', () => {
  let store: Store<StateWithSiteContext>;

  const currencies: any[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
  ];

  const entities = {
    USD: currencies[0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCurrenciesEntities', () => {
    it('should return currencies entities', () => {
      let result;

      store
        .pipe(select(fromSelectors.getCurrenciesEntities))
        .subscribe(value => (result = value));
      console.log('result!', result);
      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));

      expect(result).toEqual(entities);
    });
  });

  describe('getActiveCurrency', () => {
    it('should return the active currency', () => {
      let result;

      store
        .pipe(select(fromSelectors.getActiveCurrency))
        .subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new fromActions.SetActiveCurrency('USD'));

      expect(result).toEqual('USD');
    });
  });

  describe('getAllCurrencies', () => {
    it('should return all currencies', () => {
      let result;

      store
        .pipe(select(fromSelectors.getAllCurrencies))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));

      expect(result).toEqual(currencies);
    });
  });
});
