import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListTask } from 'app/shared/model/list-task.model';
import { ListTaskService } from './list-task.service';

@Component({
  selector: 'jhi-list-task-delete-dialog',
  templateUrl: './list-task-delete-dialog.component.html'
})
export class ListTaskDeleteDialogComponent {
  listTask: IListTask;

  constructor(protected listTaskService: ListTaskService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.listTaskService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'listTaskListModification',
        content: 'Deleted an listTask'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-list-task-delete-popup',
  template: ''
})
export class ListTaskDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ listTask }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ListTaskDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.listTask = listTask;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/list-task', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/list-task', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
