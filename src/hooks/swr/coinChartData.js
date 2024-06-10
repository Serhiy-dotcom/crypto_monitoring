import cryptoAxios from './setupCryptoAxios';
import useSWR from 'swr';

const DEFAULT_MARKET_DATA = { market_caps: [], prices: [], total_volumes: [] };

const coinChartMarketDataFetcher = async ([currencyId, params]) => {
	const { data } = await cryptoAxios.get(`coins/${currencyId}/market_chart`, { params });

	return data;
};

const coinChartOhlcDataFetcher = async ([currencyId, params]) => {
	const { data } = await cryptoAxios.get(`coins/${currencyId}/ohlc`, { params });

	return data;
};

export const useCoinChartData = (coinId, chartType = 'area', { interval, precision, vs_currency = 'usd', days = '7' } = {}) => {
	if (chartType === 'area') {
		const { data = DEFAULT_MARKET_DATA, error, isValidating, mutate } = useSWR([coinId, { interval, precision, vs_currency, days }, 'area'], coinChartMarketDataFetcher, {
			refreshInterval: 300000
		});

		return { data, error, isLoading: !data && !error, isValidating, mutate };
	} else {
		const { data = [], error, isValidating, mutate } = useSWR([coinId, { precision, vs_currency, days }, 'bar'], coinChartOhlcDataFetcher, {
			refreshInterval: 1800000
		});

		return { data, error, isLoading: !data && !error, isValidating, mutate };
	}
};
