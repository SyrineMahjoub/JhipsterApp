import { IListTask } from 'app/shared/model/list-task.model';

export interface IBoard {
  id?: string;
  name?: string;
  description?: string;
  listTasks?: IListTask[];
}

export class Board implements IBoard {
  constructor(public id?: string, public name?: string, public description?: string, public listTasks?: IListTask[]) {}
}
