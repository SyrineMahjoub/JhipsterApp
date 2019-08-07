/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StageTestModule } from '../../../test.module';
import { ListTaskDetailComponent } from 'app/entities/list-task/list-task-detail.component';
import { ListTask } from 'app/shared/model/list-task.model';

describe('Component Tests', () => {
  describe('ListTask Management Detail Component', () => {
    let comp: ListTaskDetailComponent;
    let fixture: ComponentFixture<ListTaskDetailComponent>;
    const route = ({ data: of({ listTask: new ListTask('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StageTestModule],
        declarations: [ListTaskDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ListTaskDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListTaskDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.listTask).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
