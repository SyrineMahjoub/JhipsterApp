import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IListTask, ListTask } from 'app/shared/model/list-task.model';
import { ListTaskService } from './list-task.service';

@Component({
  selector: 'jhi-list-task-update',
  templateUrl: './list-task-update.component.html'
})
export class ListTaskUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected listTaskService: ListTaskService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ listTask }) => {
      this.updateForm(listTask);
    });
  }

  updateForm(listTask: IListTask) {
    this.editForm.patchValue({
      id: listTask.id,
      name: listTask.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const listTask = this.createFromForm();
    if (listTask.id !== undefined) {
      this.subscribeToSaveResponse(this.listTaskService.update(listTask));
    } else {
      this.subscribeToSaveResponse(this.listTaskService.create(listTask));
    }
  }

  private createFromForm(): IListTask {
    return {
      ...new ListTask(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListTask>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
