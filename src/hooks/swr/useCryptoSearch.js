import cryptoAxios from './setupCryptoAxios';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import _ from 'lodash';

const DEFAULT_DATA = { coins: [], exchanges: [], icos: [], categories: [], nfts: [] };

const cryptoSearchFetcher = async (query) => {
	const { data } = await cryptoAxios.get('search', { params: { query } });
	return data;
};

export const useCryptoSearch = (query) => {
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	useEffect(() => {
		const handler = _.debounce(() => setDebouncedQuery(query), 500);
		handler();

		return () => {
			handler.cancel();
		};
	}, [query]);

	const { data = DEFAULT_DATA, error, isValidating, mutate } = useSWR(debouncedQuery, cryptoSearchFetcher, {
		refreshInterval: 60000
	});

	return { data, error, isLoading: !data && !error, isValidating, mutate };
};
