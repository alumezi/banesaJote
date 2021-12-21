import { Dispatch } from 'redux';
import { IFilter, IFilters, IProperty, RootState } from '../types';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_PROPERTIES = 'REQUEST_PROPERTIES';
export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES';
export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const ADD_FILTERS = 'ADD_FILTERS';

const baseUrl = '/api';

export const requestUser = () => ({
  type: REQUEST_USER,
  user: 'user',
});

export const receiveUser = (user: any) => ({
  type: RECEIVE_USER,
  user,
});

export const requestProperties = () => ({
  type: REQUEST_PROPERTIES,
  properties: 'properties',
});

export const requestFilters = () => ({
  type: REQUEST_FILTERS,
  filters: 'filters',
});

export const receiveProperties = (properties: IProperty[]) => ({
  type: RECEIVE_PROPERTIES,
  properties,
  receivedAt: Date.now(),
});

export const setActiveFilters = (queryParams: Record<string, IFilter>) => ({
  type: ADD_FILTERS,
  queryParams,
});

export const receiveFilters = (filters: IFilters[]) => {
  const filterDataReady: Record<string, IFilter[]> = {};
  filters.forEach((element) => {
    element.filters.unshift({ id: 'all', name: 'Te gjitha', searchKey: '' });
    filterDataReady[element.name] = element.filters;
  });

  return {
    type: RECEIVE_FILTERS,
    filters: filterDataReady,
    receivedAt: Date.now(),
  };
};

export const fetchUser = () => (dispatch: Dispatch) => {
  dispatch(requestUser());
  try {
    return fetch(`${baseUrl}/current_user`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveUser(json)));
  } catch (err) {
    console.error(err);
  }
};

export const fetchFilters = () => (dispatch: Dispatch) => {
  dispatch(requestFilters());
  try {
    return fetch(`${baseUrl}/filters`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveFilters(json)));
  } catch (err) {
    console.error(err);
  }
};

export const fetchProperties = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { activeFilters } = getState();
  const query = [];

  for (let key in activeFilters.items) {
    if (activeFilters.items[key].searchKey) {
      query.push(`filters[${key}]=${activeFilters.items[key].searchKey}`);
    }
  }

  dispatch(requestProperties());
  try {
    return fetch(`${baseUrl}/properties/?${query.join('&')}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveProperties(json)));
  } catch (err) {
    console.error(err);
  }
};
