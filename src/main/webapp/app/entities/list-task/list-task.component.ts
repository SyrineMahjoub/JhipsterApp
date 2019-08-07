import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListTask } from 'app/shared/model/list-task.model';
import { AccountService } from 'app/core';
import { ListTaskService } from './list-task.service';

@Component({
  selector: 'jhi-list-task',
  templateUrl: './list-task.component.html'
})
export class ListTaskComponent implements OnInit, OnDestroy {
  listTasks: IListTask[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected listTaskService: ListTaskService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.listTaskService
      .query()
      .pipe(
        filter((res: HttpResponse<IListTask[]>) => res.ok),
        map((res: HttpResponse<IListTask[]>) => res.body)
      )
      .subscribe(
        (res: IListTask[]) => {
          this.listTasks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListTasks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListTask) {
    return item.id;
  }

  registerChangeInListTasks() {
    this.eventSubscriber = this.eventManager.subscribe('listTaskListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
