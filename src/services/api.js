import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.orulo.com.br/api/v2/',
});

export default api;
