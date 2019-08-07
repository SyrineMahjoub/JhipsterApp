import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StageSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [StageSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [StageSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageSharedModule {
  static forRoot() {
    return {
      ngModule: StageSharedModule
    };
  }
}
