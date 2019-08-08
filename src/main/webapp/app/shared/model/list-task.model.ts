import { ITask } from 'app/shared/model/task.model';
import { IBoard } from 'app/shared/model/board.model';

export interface IListTask {
  id?: string;
  name?: string;
  description?: string;
  tasks?: ITask[];
  board?: IBoard;
}

export class ListTask implements IListTask {
  constructor(public id?: string, public name?: string, public description?: string, public tasks?: ITask[], public board?: IBoard) {}
}
