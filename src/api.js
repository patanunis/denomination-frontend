import axios from 'axios';

axios.defaults.baseURL = 'https://denomination-backend-production.up.railway.app';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
