import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBoard } from 'app/shared/model/board.model';
import { AccountService } from 'app/core';
import { BoardService } from './board.service';

@Component({
  selector: 'jhi-board',
  templateUrl: './board.component.html',
  styleUrls: ['board.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  boards: IBoard[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected boardService: BoardService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.boardService
      .query()
      .pipe(
        filter((res: HttpResponse<IBoard[]>) => res.ok),
        map((res: HttpResponse<IBoard[]>) => res.body)
      )
      .subscribe(
        (res: IBoard[]) => {
          this.boards = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBoards();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBoard) {
    return item.id;
  }

  registerChangeInBoards() {
    this.eventSubscriber = this.eventManager.subscribe('boardListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
