import cryptoAxios from './setupCryptoAxios';
import useSWR from 'swr';

const coinsMarketDataFetcher = async (params) => {
	const { data } = await cryptoAxios.get('coins/markets', { params });

	return data;
}

export const useCoinsMarketData = ({ ids, category, order, per_page, page, sparkline, price_change_percentage, precision, local = 'en', vs_currency = 'usd' } = {}) => {
	const { data = [], error, isValidating, mutate } = useSWR({ ids, category, order, per_page, page, sparkline, price_change_percentage, precision, local, vs_currency }, coinsMarketDataFetcher, {
		refreshInterval: 45000,
	});

	return { data, error, isLoading: !data && !error, isValidating, mutate }
};
