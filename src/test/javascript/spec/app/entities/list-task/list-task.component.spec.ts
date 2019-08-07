/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StageTestModule } from '../../../test.module';
import { ListTaskComponent } from 'app/entities/list-task/list-task.component';
import { ListTaskService } from 'app/entities/list-task/list-task.service';
import { ListTask } from 'app/shared/model/list-task.model';

describe('Component Tests', () => {
  describe('ListTask Management Component', () => {
    let comp: ListTaskComponent;
    let fixture: ComponentFixture<ListTaskComponent>;
    let service: ListTaskService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StageTestModule],
        declarations: [ListTaskComponent],
        providers: []
      })
        .overrideTemplate(ListTaskComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListTaskComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListTaskService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ListTask('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.listTasks[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
