import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IListTask, ListTask } from 'app/shared/model/list-task.model';
import { ListTaskService } from './list-task.service';
import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from 'app/entities/board';

@Component({
  selector: 'jhi-list-task-update',
  templateUrl: './list-task-update.component.html'
})
export class ListTaskUpdateComponent implements OnInit {
  isSaving: boolean;

  boards: IBoard[];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    board: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected listTaskService: ListTaskService,
    protected boardService: BoardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ listTask }) => {
      this.updateForm(listTask);
    });
    this.boardService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBoard[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBoard[]>) => response.body)
      )
      .subscribe((res: IBoard[]) => (this.boards = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(listTask: IListTask) {
    this.editForm.patchValue({
      id: listTask.id,
      name: listTask.name,
      description: listTask.description,
      board: listTask.board
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
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      board: this.editForm.get(['board']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackBoardById(index: number, item: IBoard) {
    return item.id;
  }
}
