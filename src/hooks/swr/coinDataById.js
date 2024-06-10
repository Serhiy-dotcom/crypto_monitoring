import cryptoAxios from './setupCryptoAxios';
import useSWR from 'swr';

const coinDataByIdFetcher = async ([currencyId, params]) => {
	const { data } = await cryptoAxios.get(`coins/${currencyId}`, { params });

	return data;
};

export const useCoinDataById = (coinId, { localization, tickers, market_data, community_data, developer_data, sparkline } = {}) => {
	const { data = {}, error, isValidating, mutate } = useSWR([coinId, { localization, tickers, market_data, community_data, developer_data, sparkline }], coinDataByIdFetcher, {
		refreshInterval: 60000
	});

	return { data, error, isLoading: !data && !error, isValidating, mutate };
};
