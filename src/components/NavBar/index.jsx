import { useState } from 'react';
import { Link } from 'react-router-dom';

import numeral from 'numeral';

import { useCryptoGlobalInfo } from '../../hooks/swr';

import SearchBox from './SearchBox';

import { NavBarWrapper, NavItem, RightNavItem, NavigationWrapper } from './style';

const NavBar = () => {
	const { data: globalInfo, isLoading, isValidating, error } = useCryptoGlobalInfo();

	if (isLoading || isValidating) return <div>Loading...</div>;

	if (error) return <div>Error</div>

	return (
		<NavBarWrapper>
			<NavItem>
				Cryptos:
				<span>{numeral(globalInfo.active_cryptocurrencies).format('0.0a').toUpperCase()}+</span>
			</NavItem>

			<NavItem>
				Exchanges:
				<span>{globalInfo.markets}</span>
			</NavItem>

			<NavItem>
				Market Cap:
				<span>{numeral(globalInfo.total_market_cap.usd).format('$0.00a').toUpperCase()}</span>
			</NavItem>

			<NavItem>
				24h Vol:
				<span>{numeral(globalInfo.total_volume.usd).format('$0.00a').toUpperCase()}</span>
			</NavItem>

			<NavItem>
				Dominance:
				<span>BTC:{globalInfo.market_cap_percentage.btc.toFixed(1)}% ETH:{globalInfo.market_cap_percentage.eth.toFixed(1)}%</span>
			</NavItem>

			<RightNavItem>
				<SearchBox />
			</RightNavItem>

			<NavItem>
				<Navigation />
			</NavItem>
		</NavBarWrapper>
	);
}

export default NavBar;

const Navigation = () => {
	const [showLinks, setShowLinks] = useState(false);

	return (
		<NavigationWrapper>
			<button onClick={() => setShowLinks((prevValue) => !prevValue)}>
				Navigate
				<i class="fa-solid fa-angle-down"></i>
			</button>

			{showLinks && (
				<ul>
					<li>
						<Link to="/" onClick={() => setShowLinks(false)}>Home</Link>
					</li>

					<hr />

					<li>
						<Link to="/eth/scanner" onClick={() => setShowLinks(false)}>ETH Scanner</Link>
					</li>
				</ul>
			)}
		</NavigationWrapper>
	);
};
