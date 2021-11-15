import { Dispatch } from 'redux';
import { IFilter, IFilters, IProperty } from '../types';

export const REQUEST_PROPERTIES = 'REQUEST_PROPERTIES';
export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES';
export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';

const baseUrl = '/api';

export const requestProperties = (properties: string) => ({
  type: REQUEST_PROPERTIES,
  properties,
});

export const requestFilters = (filters: string) => ({
  type: REQUEST_FILTERS,
  filters,
});

export const receiveProperties = (properties: IProperty[]) => ({
  type: RECEIVE_PROPERTIES,
  properties,
  receivedAt: Date.now(),
});

export const receiveFilters = (filters: IFilters[]) => {
  const filterDataReady: Record<string, IFilter[]> = {};
  filters.forEach((element) => {
    filterDataReady[element.name] = element.filters;
  });

  return {
    type: RECEIVE_FILTERS,
    filters: filterDataReady,
    receivedAt: Date.now(),
  };
};

export const fetchFilters = () => (dispatch: Dispatch) => {
  dispatch(requestFilters('filters'));
  try {
    return fetch(`${baseUrl}/filters`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveFilters(json)));
  } catch (err) {
    console.error(err);
  }
};

export const fetchProperties = () => (dispatch: Dispatch) => {
  dispatch(requestProperties('properties'));
  try {
    return fetch(`${baseUrl}/properties`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveProperties(json)));
  } catch (err) {
    console.error(err);
  }
};
