import Slider from "react-slick";

import { useTrendingCoins } from '../../hooks/swr';

import shortenString from "../../utils/shortenString";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { TrendingNFTsContainer, TrendingNFTsHeader, TrendingNFTsItem } from "./style";

const TrendingNFTs = () => {
	const { data: { nfts }, isLoading, error } = useTrendingCoins();

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error</div>;

	return (
		<TrendingNFTsContainer>
			<TrendingNFTsHeader>💸 Trending NFTs</TrendingNFTsHeader>

			<Slider
				dots
				infinite
				autoplay
				draggable={false}
				arrows={false}
				speed={500}
				rows={3}
			>
				{nfts.map((item, index) => (
					<TrendingNFTsItem key={item.id}>
						<div>
							<span className="score">{++index}</span>
							<img src={item.thumb} alt={item.id} />
							<span className="name">{shortenString(item.name)}</span>
							<span className="symbol">{shortenString(item.symbol)}</span>
							<span className="percentChange">{item.floor_price_24h_percentage_change.toFixed(2)}%</span>
						</div>
					</TrendingNFTsItem>
				))}
			</Slider>
		</TrendingNFTsContainer>
	)
}

export default TrendingNFTs;