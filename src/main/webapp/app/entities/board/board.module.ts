import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { StageSharedModule } from 'app/shared';
import {
  BoardComponent,
  BoardDetailComponent,
  BoardUpdateComponent,
  BoardDeletePopupComponent,
  BoardDeleteDialogComponent,
  boardRoute,
  boardPopupRoute
} from './';

const ENTITY_STATES = [...boardRoute, ...boardPopupRoute];

@NgModule({
  imports: [StageSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BoardComponent, BoardDetailComponent, BoardUpdateComponent, BoardDeleteDialogComponent, BoardDeletePopupComponent],
  entryComponents: [BoardComponent, BoardUpdateComponent, BoardDeleteDialogComponent, BoardDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageBoardModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
