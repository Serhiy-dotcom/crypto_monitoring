import cryptoAxios from './setupCryptoAxios';
import useSWR from 'swr';

const DEFAULT_DATA = { categories: [], coins: [], nfts: [] };

const trendingCoinsFetcher = async () => {
	const { data } = await cryptoAxios.get('search/trending');

	return data;
};

export const useTrendingCoins = () => {
	const { data = DEFAULT_DATA, error, isValidating, mutate } = useSWR('trendingCoins', trendingCoinsFetcher, {
		refreshInterval: 600000
	});

	return { data, error, isLoading: !data && !error, isValidating, mutate };
};
