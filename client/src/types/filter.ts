export interface IFilter {
  id: string;
  name: string;
}

export interface IFilters {
  name: string;
  filters: IFilter[];
}
