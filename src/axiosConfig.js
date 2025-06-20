import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.defaults.headers['Content-Type'] = 'application/json';

export default axios;
