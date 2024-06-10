import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";

import Main from './pages/Main';
import Currency from './pages/Currency';
import EthScanner from './pages/EthScanner';

import GeneralWrapper from "./components/GeneralWrapper";

const swrConfig = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	dedupingInterval: 0,
  	errorRetryCount: 0,
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <GeneralWrapper component={<Main />} />
	},
	{
		path: '/currency/:currencyId',
		element: <GeneralWrapper component={<Currency />} />
	},
	{
		path: '/eth/scanner',
		element: <GeneralWrapper component={<EthScanner />} />
	}
]);

function App() {
	return (
		<SWRConfig value={swrConfig}>
			<RouterProvider router={router} />
		</SWRConfig>
	);
}

export default App;
