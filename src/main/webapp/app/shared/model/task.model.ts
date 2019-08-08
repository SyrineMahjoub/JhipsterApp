import { IListTask } from 'app/shared/model/list-task.model';

export interface ITask {
  id?: string;
  name?: string;
  description?: string;
  listTask?: IListTask;
}

export class Task implements ITask {
  constructor(public id?: string, public name?: string, public description?: string, public listTask?: IListTask) {}
}
