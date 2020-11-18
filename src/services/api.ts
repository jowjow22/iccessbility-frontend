import axios from 'axios';

const api = axios.create({
  baseURL: 'https://iccessbility.herokuapp.com',
});

export default api;