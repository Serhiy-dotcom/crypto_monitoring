import cryptoAxios from './setupCryptoAxios';
import useSWR from 'swr';

const DEFAULT_DATA = { active_cryptocurrencies: 0, markets: 0, total_market_cap: {}, total_volume: {}, market_cap_percentage: {} };

const cryptoGlobalInfoFetcher = async () => {
	const { data: { data } } = await cryptoAxios.get('global');

	return data;
};

export const useCryptoGlobalInfo = () => {
	const { data = DEFAULT_DATA, error, isValidating, mutate } = useSWR('cryptoGlobalInfo', cryptoGlobalInfoFetcher, {
		refreshInterval: 600000
	});

	return { data, error, isLoading: !data && !error, isValidating, mutate };
};
