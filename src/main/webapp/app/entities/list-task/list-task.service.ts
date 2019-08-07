import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListTask } from 'app/shared/model/list-task.model';

type EntityResponseType = HttpResponse<IListTask>;
type EntityArrayResponseType = HttpResponse<IListTask[]>;

@Injectable({ providedIn: 'root' })
export class ListTaskService {
  public resourceUrl = SERVER_API_URL + 'api/list-tasks';

  constructor(protected http: HttpClient) {}

  create(listTask: IListTask): Observable<EntityResponseType> {
    return this.http.post<IListTask>(this.resourceUrl, listTask, { observe: 'response' });
  }

  update(listTask: IListTask): Observable<EntityResponseType> {
    return this.http.put<IListTask>(this.resourceUrl, listTask, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IListTask>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListTask[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
