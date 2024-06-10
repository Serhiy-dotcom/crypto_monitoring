import TrendingCoins from "../../components/TrendingCoins";
import TrendingNFTs from "../../components/TrendingNFTs";
import CoinsDashboard from "../../components/CoinsDashboard";

import { MainWrapper, TrendingContainer } from './style';

const Main = () => {
	return (
		<MainWrapper>
			<TrendingContainer>
				<TrendingCoins />
				<TrendingNFTs />
			</TrendingContainer>

			<CoinsDashboard />
		</MainWrapper>
	);
};

export default Main;
