import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterState } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { ConfiguratorCommonsService } from 'projects/core/src/configurator/commons/facade/configurator-commons.service';
import { ProductConfiguration } from 'projects/core/src/model/configurator.model';
import { Observable, of } from 'rxjs';
import { ConfigurationFormComponent } from './configuration-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      pcCode: PRODUCT_CODE,
    },
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorCommonsService {
  createConfiguration(productCode: string): Observable<ProductConfiguration> {
    const productConfig: ProductConfiguration = {
      consistent: true,
      complete: true,
      productCode: productCode,
    };
    return of(productConfig);
  }
}

describe('ConfigurationFormComponent', () => {
  let component: ConfigurationFormComponent;
  let fixture: ComponentFixture<ConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfigurationFormComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },

        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationFormComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code as part of poroduct configuration', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let productCode: string;
    component.configuration$.subscribe(
      (data: ProductConfiguration) => (productCode = data.productCode)
    );

    expect(productCode).toEqual(PRODUCT_CODE);
  });
});
