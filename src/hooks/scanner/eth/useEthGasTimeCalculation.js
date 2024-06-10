import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import ethScannerAxios from './setupEthScannerAxios';

export const useEthGasTimeCalculation = (gasprice) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		debounce(async (gasprice) => {
			let isMounted = true;
			try {
				setLoading(true);

				const { data } = await ethScannerAxios.get('/', {
					params: {
						module: 'gastracker',
						action: 'gasestimate',
						gasprice
					}
				});

				if (isMounted) {
					setData(data.result / 60);
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setLoading(false);
				}
			}

			return () => isMounted = false;
		}, 500), []
	);

	useEffect(() => {
		if (gasprice) fetchData(gasprice);
		else setData(0);

		return () => fetchData.cancel();
	}, [gasprice, fetchData]);

	return { data, loading, error };
};
