import { useEffect, useState, useCallback } from 'react';
import ethScannerAxios from './setupEthScannerAxios';

export const useEthGasOracle = (address, retryCount = 3) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  const fetchData = useCallback(async (retryAttempts) => {
    let isMounted = true;
    try {
      setLoading(true);

      const { data } = await ethScannerAxios.get('/', {
        params: {
          module: 'gastracker',
          action: 'gasoracle'
        }
      });

      if (isMounted) {
        const { SafeGasPrice, ProposeGasPrice, FastGasPrice, suggestBaseFee } = data.result;

        setData({
          safeGasPrice: SafeGasPrice,
          proposeGasPrice: ProposeGasPrice,
          fastGasPrice: FastGasPrice,
          suggestBaseFee
        });
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      if (isMounted) {
        setError(err);
        setLoading(false);
        if (retryAttempts < retryCount) {
          setRetry(retryAttempts + 1);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [retryCount, address]);

  useEffect(() => {
    fetchData(retry);
  }, [retry, fetchData]);

  return { data, loading, error, retry: () => setRetry(retry + 1) };
};
