import { Link } from "react-router-dom";
import Slider from "react-slick";

import { useTrendingCoins } from '../../hooks/swr';

import shortenString from "../../utils/shortenString";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { TrendingCoinsContainer, TrendingCoinsHeader, TrendingCoinsItem } from "./style";

const TrendingCoins = () => {
	const { data: { coins }, isLoading, error } = useTrendingCoins();

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error</div>;

	return (
		<TrendingCoinsContainer>
			<TrendingCoinsHeader>🔥 Trending Coins</TrendingCoinsHeader>

			<Slider
				dots
				infinite
				autoplay
				draggable={false}
				arrows={false}
				speed={500}
				rows={3}
			>
				{coins.map(({ item }, index) => (
					<TrendingCoinsItem key={item.coin_id}>
						<Link to={`/currency/${item.id}`}>
							<span className="score">{++index}</span>
							<img src={item?.large ?? item?.thumb} alt={item.slug} />
							<span className="name">{shortenString(item.name)}</span>
							<span className="symbol">{shortenString(item.symbol)}</span>
							<span className="percentChange">{item.data.price_change_percentage_24h.usd.toFixed(2)}%</span>
						</Link>
					</TrendingCoinsItem>
				))}
			</Slider>
		</TrendingCoinsContainer>
	)
}

export default TrendingCoins;