import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListTask } from 'app/shared/model/list-task.model';
import { ListTaskService } from './list-task.service';
import { ListTaskComponent } from './list-task.component';
import { ListTaskDetailComponent } from './list-task-detail.component';
import { ListTaskUpdateComponent } from './list-task-update.component';
import { ListTaskDeletePopupComponent } from './list-task-delete-dialog.component';
import { IListTask } from 'app/shared/model/list-task.model';

@Injectable({ providedIn: 'root' })
export class ListTaskResolve implements Resolve<IListTask> {
  constructor(private service: ListTaskService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IListTask> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ListTask>) => response.ok),
        map((listTask: HttpResponse<ListTask>) => listTask.body)
      );
    }
    return of(new ListTask());
  }
}

export const listTaskRoute: Routes = [
  {
    path: '',
    component: ListTaskComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'stageApp.listTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListTaskDetailComponent,
    resolve: {
      listTask: ListTaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'stageApp.listTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListTaskUpdateComponent,
    resolve: {
      listTask: ListTaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'stageApp.listTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListTaskUpdateComponent,
    resolve: {
      listTask: ListTaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'stageApp.listTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const listTaskPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ListTaskDeletePopupComponent,
    resolve: {
      listTask: ListTaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'stageApp.listTask.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
