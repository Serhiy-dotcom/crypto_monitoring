import { useEffect, useState } from 'react';

import ethScannerAxios from './setupEthScannerAxios';

export const useEthAccountBalance = (address) => {
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
					action: 'balance',
					address,
					tag: 'latest'
				} });

				if (isMounted) {
					setData(data.result * 0.000000000000000001);
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
	}, [address]);

	return { data, loading, error };
};
