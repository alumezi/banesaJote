import { IActiveFilter, IFilter, IProperty } from '.';

interface StateProperties {
  items: IProperty[];
  isFetching: boolean;
}

interface StateFilters {
  items: Record<string, IFilter[]>;
  isFetching: boolean;
}

interface StateActiveFilters {
  neighborhood: IFilter;
  items: IActiveFilter;
}

export interface RootState {
  properties: StateProperties;
  filters: StateFilters;
  activeFilters: StateActiveFilters;
}
