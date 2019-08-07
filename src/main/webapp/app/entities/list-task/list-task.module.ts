import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { StageSharedModule } from 'app/shared';
import {
  ListTaskComponent,
  ListTaskDetailComponent,
  ListTaskUpdateComponent,
  ListTaskDeletePopupComponent,
  ListTaskDeleteDialogComponent,
  listTaskRoute,
  listTaskPopupRoute
} from './';

const ENTITY_STATES = [...listTaskRoute, ...listTaskPopupRoute];

@NgModule({
  imports: [StageSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ListTaskComponent,
    ListTaskDetailComponent,
    ListTaskUpdateComponent,
    ListTaskDeleteDialogComponent,
    ListTaskDeletePopupComponent
  ],
  entryComponents: [ListTaskComponent, ListTaskUpdateComponent, ListTaskDeleteDialogComponent, ListTaskDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageListTaskModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
