import { useEffect, useState } from 'react';

import ethScannerAxios from './setupEthScannerAxios';

export const useEthTransactionList = (address, page = 1, offset = 25, action = 'txlist') => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				setLoading(true);

				const { data } = await ethScannerAxios.get('/', { params: {
					module: 'account',
					action,
					address,
					startblock: 0,
					endblock: 99999999,
					page,
					offset,
					sort: 'desc'
				} });

				if (isMounted) {
					setData(data.result);
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => isMounted = false;
	}, [address, page, offset, action]);

	return { data, loading, error };
};
