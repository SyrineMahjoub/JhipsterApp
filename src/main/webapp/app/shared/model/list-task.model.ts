export interface IListTask {
  id?: string;
  name?: string;
}

export class ListTask implements IListTask {
  constructor(public id?: string, public name?: string) {}
}
