import axios from 'axios';

const cryptoAxios = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/'
});

cryptoAxios.interceptors.request.use((config) => {
  config.headers['x_cg_demo_api_key'] = import.meta.env.VITE_COINGECKO_API_KEY;
  return config;
});

export default cryptoAxios;
