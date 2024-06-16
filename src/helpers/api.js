import axios from 'axios';

const api = axios.create({
  baseURL: 'https://slight-api-77b9233d558c.herokuapp.com/api',
});

export default api;