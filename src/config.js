// config.js
import axios from 'axios';

const baseURL = 'https://api.utlsolutions.com/color/api/admin';

const api = axios.create({
  baseURL,
});

export default api;
