export interface IFilter {
  id: string;
  name: string;
}

export interface IFilters {
  name: 'byLocation' | 'byParkingTypes' | 'byNumberOfRooms';
  filters: IFilter[];
}
