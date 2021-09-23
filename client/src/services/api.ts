import axios from 'axios';
const baseUrl = '/api';
const tokenType = 'bearer ';

export const getUser = async (token) => {
  const response = await axios.get('/current_user');
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(baseUrl + '/login', {
    username,
    password,
  });
  return response.data;
};

export const logout = async (username, password) => {
  const response = await axios.get('/logout');
  return response.data;
};

export const signup = async (username, name, password) => {
  const response = await axios.post(baseUrl + '/users', {
    username,
    name,
    password,
  });
  return response.data;
};

export const getFilters = async (token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  };
  const response = await axios.get(baseUrl + '/filters', config);
  return response.data;
};

export const getProperties = async (token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  };
  const response = await axios.get(baseUrl + '/properties', config);
  return response.data;
};

export const createProperty = async (payload) => {
  const response = await axios.post(baseUrl + '/properties/create', payload);
  return response.data;
};

// const formDataUploader = (data) =>{
//   const formData = new FormData()
//   Object.keys(data).forEach(item => {
//     formData
//   })

// }
