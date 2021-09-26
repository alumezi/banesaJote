import axios from 'axios';
import { IUser, IProperty, IFilter, IFilters } from '../types';
const baseUrl = '/api';
const tokenType = 'bearer ';

export const getUser = async (): Promise<IUser> => {
  const response = await axios.get('/current_user');
  return response.data;
};

export const login = async (
  username: string,
  password: string
): Promise<IUser> => {
  const response = await axios.post(baseUrl + '/login', {
    username,
    password,
  });
  return response.data;
};

export const logout = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await axios.get('/logout');
  return response.data;
};

export const signup = async (
  username: string,
  name: string,
  password: string
): Promise<IUser> => {
  const response = await axios.post(baseUrl + '/users', {
    username,
    name,
    password,
  });
  return response.data;
};

export const getFilters = async (): Promise<IFilters> => {
  const response = await axios.get(baseUrl + '/filters');
  return response.data;
};

export const getProperties = async (): Promise<IProperty[]> => {
  const response = await axios.get(baseUrl + '/properties');
  return response.data;
};

export const createProperty = async (
  payload: IProperty
): Promise<IProperty> => {
  const response = await axios.post(baseUrl + '/properties/create', payload);
  return response.data;
};
