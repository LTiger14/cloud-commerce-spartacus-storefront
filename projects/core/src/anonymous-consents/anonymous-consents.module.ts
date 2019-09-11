import { ModuleWithProviders, NgModule } from '@angular/core';
import { AnonymousConsentsService } from './facade/anonymous-consents.service';
import { interceptors } from './http-interceptors/index';
import { AnonymousConsentsStoreModule } from './store/anonymous-consents-store.module';

@NgModule({
  imports: [AnonymousConsentsStoreModule],
})
export class AnonymousConsentsModule {
  static forRoot(): ModuleWithProviders<AnonymousConsentsModule> {
    return {
      ngModule: AnonymousConsentsModule,
      providers: [...interceptors, AnonymousConsentsService],
    };
  }
}
