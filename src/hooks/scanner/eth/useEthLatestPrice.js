import { useEffect, useState } from 'react';

import ethScannerAxios from './setupEthScannerAxios';

export const useEthLatestPrice = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				setLoading(true);

				const { data } = await ethScannerAxios.get('/', { params: {
					module: 'stats',
					action: 'ethprice'
				} });

				if (isMounted) {
					setData(data.result.ethusd);
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
	}, []);

	return { data, loading, error };
};
