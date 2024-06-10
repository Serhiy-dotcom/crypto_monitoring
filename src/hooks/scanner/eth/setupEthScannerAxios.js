import axios from 'axios';

const ethScannerAxios = axios.create({
	baseURL: 'https://api.etherscan.io/api'
});

ethScannerAxios.interceptors.request.use((config) => {
	config.params = config.params || {};
	config.params.apikey = import.meta.env.VITE_ETH_SCANNER_API_KEY;
	return config;
});

export default ethScannerAxios;
