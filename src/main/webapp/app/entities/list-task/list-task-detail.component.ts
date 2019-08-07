import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListTask } from 'app/shared/model/list-task.model';

@Component({
  selector: 'jhi-list-task-detail',
  templateUrl: './list-task-detail.component.html'
})
export class ListTaskDetailComponent implements OnInit {
  listTask: IListTask;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ listTask }) => {
      this.listTask = listTask;
    });
  }

  previousState() {
    window.history.back();
  }
}
