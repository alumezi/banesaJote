import { combineReducers } from 'redux';

import {
  REQUEST_FILTERS,
  RECEIVE_FILTERS,
  REQUEST_PROPERTIES,
  RECEIVE_PROPERTIES,
  ADD_FILTERS,
} from '../actions';
import { IProperty, IFilter, IActiveFilter } from '../types';

interface PropertyActionProps {
  type: string;
  properties: IProperty[];
  receivedAt: Date;
}

interface FiltersActionProps {
  type: string;
  filters: Record<string, IFilter[]>;
  receivedAt: Date;
}

interface AddFiltersActionProps {
  type: string;
  queryParams: IActiveFilter;
}

const properties = (
  state = {
    isFetching: false,
    items: [],
  },
  action: PropertyActionProps
) => {
  switch (action.type) {
    case REQUEST_PROPERTIES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PROPERTIES:
      return {
        ...state,
        isFetching: false,
        items: action.properties,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const filters = (
  state = {
    isFetching: false,
    items: {},
  },
  action: FiltersActionProps
) => {
  switch (action.type) {
    case REQUEST_FILTERS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_FILTERS:
      return {
        ...state,
        isFetching: false,
        items: action.filters,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const activeFilters = (
  state = {
    items: {},
  },
  action: AddFiltersActionProps
) => {
  switch (action.type) {
    case ADD_FILTERS:
      return {
        ...state,
        items: action.queryParams,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  properties,
  filters,
  activeFilters,
});

export default rootReducer;
