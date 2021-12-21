export interface IFilter {
  id: string;
  name: string;
  searchKey: string;
}

export interface IFilters {
  name: 'neighborhood' | 'byParkingTypes' | 'byNumberOfRooms';
  filters: IFilter[];
}

export interface IActiveFilter {
  neighborhood: IFilter;
  byParkingTypes: IFilter;
  byNumberOfRooms: IFilter;
  [key: string]: IFilter;
}
