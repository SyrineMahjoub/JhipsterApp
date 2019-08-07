export interface ITask {
  id?: string;
  name?: string;
  description?: string;
}

export class Task implements ITask {
  constructor(public id?: string, public name?: string, public description?: string) {}
}
