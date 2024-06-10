import axios from 'axios';

axios.interceptors.request.use(function (config) {
	config.headers.x_cg_demo_api_key = import.meta.env.VITE_COINGECKO_API_KEY;

	return config;
});
