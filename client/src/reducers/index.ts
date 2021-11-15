import { combineReducers } from 'redux';

import {
  REQUEST_FILTERS,
  RECEIVE_FILTERS,
  REQUEST_PROPERTIES,
  RECEIVE_PROPERTIES,
} from '../actions';
import { IProperty, IFilter } from '../types';

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

const rootReducer = combineReducers({
  properties,
  filters,
});

export default rootReducer;
