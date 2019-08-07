/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StageTestModule } from '../../../test.module';
import { ListTaskDeleteDialogComponent } from 'app/entities/list-task/list-task-delete-dialog.component';
import { ListTaskService } from 'app/entities/list-task/list-task.service';

describe('Component Tests', () => {
  describe('ListTask Management Delete Component', () => {
    let comp: ListTaskDeleteDialogComponent;
    let fixture: ComponentFixture<ListTaskDeleteDialogComponent>;
    let service: ListTaskService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StageTestModule],
        declarations: [ListTaskDeleteDialogComponent]
      })
        .overrideTemplate(ListTaskDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListTaskDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListTaskService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
