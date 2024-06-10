import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createChart, ColorType } from 'lightweight-charts';
import numeral from 'numeral';
import ProgressBar from '../../components/ProgressBar';
import { useCoinChartData, useCoinDataById } from '../../hooks/swr';

import {
	CurrencyWrapper,
	ChartWrapper,
	CurrencySidebar,
	CurrencyName,
	CurrencyPrice,
	CurrencyMarketData,
	CurrencyConverter,
	CurrencyInfo,
	ChartConfiguration,
	ChartTypes,
	ChartTimeframes,
} from './style';

const backgroundColor = 'white';
const lineColor = '#2962FF';
const textColor = 'black';
const areaTopColor = '#2962FF';
const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

const CHART_TIMEFRAMES = [1, 7, 30, 365];
const CHART_TYPES = ['area', 'bar'];
const AREA_CHART_TYPES = ['prices', 'market_caps', 'total_volumes'];

const Currency = () => {
	const { currencyId } = useParams();

	const [coinConverterValue, setCoinConverterValue] = useState(0);
	const [usdConverterValue, setUsdConverterValue] = useState(0);
	const [chartTimeframe, setChartTimeframe] = useState(7);
	const [chartType, setChartType] = useState('area');
	const [areaChartType, setAreaChartType] = useState('prices');

	const { data: chart } = useCoinChartData(currencyId, chartType, { days: chartTimeframe });
	const { data: coin, isLoading, isValidating, error } = useCoinDataById(currencyId, { days: chartTimeframe });

	const [chartData, setChartData] = useState([]);

	const chartContainerRef = useRef();

	useEffect(() => {
		if (chart) {
			if (chartType === 'area') {
				const transformedData = chart[areaChartType].map(([time, value]) => ({
					time: time / 1000,
					value,
				}));
				setChartData(transformedData);
			} else {
				const transformedData = chart.map(([time, open, high, low, close]) => ({
					time: time / 1000,
					open,
					high,
					low,
					close
				}));
				setChartData(transformedData);
			}
		}
	}, [chart, areaChartType]);

	useEffect(() => {
		if (chartData.length && chartContainerRef.current) {
			const chart = createChart(chartContainerRef.current, {
				localization: {
					locale: 'en-EN'
				},
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 500,
				timeScale: {
					fixLeftEdge: true,
					fixRightEdge: true,
					timeVisible: true,
					secondsVisible: false,
				},
			});
			chart.timeScale().fitContent();

			let series;
			if (chartType === 'area') {
				series = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
				series.setData(chartData.map(({ time, value }) => ({ time, value })));
			} else if (chartType === 'bar') {
				series = chart.addCandlestickSeries({
					upColor: '#26a69a',
					downColor: '#ef5350',
					borderVisible: false,
					wickUpColor: '#26a69a',
					wickDownColor: '#ef5350',
				});
				series.setData(chartData);
			}

			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		}
	}, [chartData]);

	const handleCoinConverterValueChange = (e) => {
		if (isNaN(e.target.value)) {
			return;
		}

		const usdAmount = e.target.value * coin.market_data.current_price.usd;

		setCoinConverterValue(e.target.value);
		setUsdConverterValue(usdAmount.toFixed(2));
	};

	const handleUsdConverterValueChange = (e) => {
		if (isNaN(e.target.value)) {
			return;
		}

		const coinAmount = e.target.value / coin.market_data.current_price.usd;

		setUsdConverterValue(e.target.value);
		setCoinConverterValue(coinAmount.toFixed(6) || 0);
	};

	if (!coin || isLoading || isValidating) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

	return (
		<CurrencyWrapper>
			<CurrencySidebar>
				<CurrencyName>
					<img src={coin.image?.large ?? coin.image?.thumb} alt={coin.name} />
					<div className="text">
						<span className="name">{coin.name}</span>
						<span className="symbol">{coin.symbol}</span>
					</div>
				</CurrencyName>

				<CurrencyPrice>
					{numeral(coin.market_data?.current_price.usd).format(coin.market_data?.current_price.usd > 1 ? '$0,0.00' : '$0,0.000000')}
				</CurrencyPrice>

				<CurrencyMarketData>
					<div>
						<div className="data">
							<span>Circulating supply</span>
							<span>{numeral(coin.market_data.circulating_supply).format('0,0')} {coin.symbol.toUpperCase()}</span>
						</div>
						<ProgressBar currentValue={coin.market_data.circulating_supply} maxValue={coin.market_data.total_supply} />
					</div>

					<div className="data">
						<span>Max supply</span>
						<span>{numeral(coin.market_data.total_supply).format('0,0')} {coin.symbol.toUpperCase()}</span>
					</div>

					<div className="data">
						<span>Market cap</span>
						<span>{numeral(coin.market_data.market_cap.usd).format('$0,0.00')}</span>
					</div>

					{coin.contract_address && (
						<div className="info">
							<p>Contracts</p>
							<span>{coin.contract_address}</span>
						</div>
					)}

					<p>Official links</p>

					<div className="info">
						{coin.links.homepage[0] && (
							<span>
								<a href={coin.links.homepage[0]} target="_blank">
									<i className="fa-regular fa-globe"></i>
									Website
								</a>
							</span>
						)}
						
						{coin.links.whitepaper && (
							<span>
								<a href={coin.links.whitepaper} target="_blank">
									<i className="fa-solid fa-scroll"></i>
									Whitepaper
								</a>
							</span>
						)}
					</div>

					<p>Socials</p>

					<div className="info">
						{coin.links.repos_url.github && coin.links.repos_url.github[0] && (
							<span>
								<a href={coin.links.repos_url.github[0]} target="_blank">
									<i className="fa-brands fa-github"></i>
									Github
								</a>
							</span>
						)}

						{coin.links.subreddit_url && (
							<span>
								<a href={coin.links.subreddit_url} target="_blank">
									<i className="fa-brands fa-reddit-alien"></i>
									Reddit
								</a>
							</span>
						)}
					</div>
				</CurrencyMarketData>

				<CurrencyConverter>
					<span className="name">{coin.symbol.toUpperCase()} to USD Converter</span>
					<div className="converterInputs">
						<label htmlFor={coin.symbol}>
							{coin.symbol.toUpperCase()}
							<input type="text" id={coin.symbol} value={coinConverterValue} onChange={handleCoinConverterValueChange} />
						</label>

						<label htmlFor="usd">
							USD
							<input type="text" id="usd" value={usdConverterValue} onChange={handleUsdConverterValueChange} />
						</label>
					</div>
				</CurrencyConverter>
			</CurrencySidebar>

			<CurrencyInfo>
				<ChartConfiguration>
					<ChartTypes>
						{CHART_TYPES.map((type) => (
							<li>
								<button
									className={type == chartType ? 'active' : ''}
									onClick={() => setChartType(type)}
								>
									{type === 'area' && (<i class="fa-light fa-chart-line"></i>)}
									{type === 'bar' && (<i class="fa-light fa-chart-candlestick"></i>)}
								</button>
							</li>
						))}
					</ChartTypes>

					{chartType === 'area' && (
						<ChartTypes>
							{AREA_CHART_TYPES.map((type) => (
								<li>
									<button
										className={type == areaChartType ? 'active' : ''}
										onClick={() => setAreaChartType(type)}
									>
										{type === 'prices' && 'Prices'}
										{type === 'market_caps' && 'Market cap'}
										{type === 'total_volumes' && 'Total Volume'}
									</button>
								</li>
							))}
						</ChartTypes>
					)}

					<ChartTimeframes>
						{CHART_TIMEFRAMES.map((timeframe) => (
							<li>
								<button
									className={timeframe == chartTimeframe ? 'active' : ''}
									onClick={() => setChartTimeframe(timeframe)}
								>{timeframe}D</button>
							</li>
						))}
					</ChartTimeframes>
				</ChartConfiguration>

				<ChartWrapper ref={chartContainerRef} />

				<h1>About {coin.name}</h1>

				<p dangerouslySetInnerHTML={{ __html: coin.description.en }}></p>
			</CurrencyInfo>
		</CurrencyWrapper>
	);
};

export default Currency;
