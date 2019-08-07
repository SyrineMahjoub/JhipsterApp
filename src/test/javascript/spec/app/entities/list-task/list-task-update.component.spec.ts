/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { StageTestModule } from '../../../test.module';
import { ListTaskUpdateComponent } from 'app/entities/list-task/list-task-update.component';
import { ListTaskService } from 'app/entities/list-task/list-task.service';
import { ListTask } from 'app/shared/model/list-task.model';

describe('Component Tests', () => {
  describe('ListTask Management Update Component', () => {
    let comp: ListTaskUpdateComponent;
    let fixture: ComponentFixture<ListTaskUpdateComponent>;
    let service: ListTaskService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StageTestModule],
        declarations: [ListTaskUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ListTaskUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListTaskUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListTaskService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListTask('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListTask();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
