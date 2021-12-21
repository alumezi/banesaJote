import { combineReducers } from 'redux';

import {
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_FILTERS,
  RECEIVE_FILTERS,
  REQUEST_PROPERTIES,
  RECEIVE_PROPERTIES,
  ADD_FILTERS,
} from '../actions';
import { IProperty, IFilter, IActiveFilter, IUser } from '../types';

interface UserActionProps {
  type: string;
  user: IUser;
  receivedAt: Date;
}

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

const user = (
  state = {
    isFetching: true,
    user: {},
  },
  action: UserActionProps
) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        user: action.user,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const properties = (
  state = {
    isFetching: true,
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
    isFetching: true,
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
  user,
  properties,
  filters,
  activeFilters,
});

export default rootReducer;
