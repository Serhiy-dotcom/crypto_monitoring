import { useEffect, useState } from 'react';

import ethScannerAxios from './setupEthScannerAxios';

export const useEthStats = () => {
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
					action: 'ethsupply2'
				} });

				if (isMounted) {
					const { EthSupply, Eth2Staking, BurntFees, WithdrawnTotal } = data.result;
					setData({
						ethSupply: EthSupply * 0.000000000000000001,
						ethStaked: Eth2Staking * 0.000000000000000001,
						burntFees: BurntFees * 0.000000000000000001,
						totalWithdrawn: WithdrawnTotal * 0.000000000000000001
					});
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
