import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import numeral from 'numeral';
import _ from 'lodash';

import { useCoinsMarketData } from "../../hooks/swr";

import shortenString from "../../utils/shortenString";

import Pagination from '../Pagination';

import { CoinsTable, CoinsTableHead, CoinsTableBody } from "./style";

const TOTAL_PAGES = 100;

const CoinsDashboard = () => {
	const navigate = useNavigate();
	const [orderBy, setOrderBy] = useState({ column: 'market_cap', order: 'desc' });
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, error, mutate } = useCoinsMarketData({ page: currentPage });

	useEffect(() => {
		mutate(_.orderBy(data, [orderBy.column], [orderBy.order]), false);
	}, [orderBy]);

	const toggleOrderByColumn = (e) => {
		const column = e.target.getAttribute('name');

		if (column === orderBy.column) {
			setOrderBy((prevState) => ({
				...prevState,
				order: prevState.order === 'desc' ? 'asc' : 'desc'
			}));
		} else {
			setOrderBy({ column, order: 'desc' });
		}
	}

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error</div>;

	return (
		<CoinsTable>
			<CoinsTableHead>
				<tr>
					<th className="id" name="id" onClick={toggleOrderByColumn}>#</th>
					<th className="name" name="name" onClick={toggleOrderByColumn}>Name</th>
					<th className="price" name="current_price" onClick={toggleOrderByColumn}>Price</th>
					<th className="change" name="price_change_percentage_24h" onClick={toggleOrderByColumn}>24h%</th>
					<th className="marketCap" name="market_cap" onClick={toggleOrderByColumn}>Market Cap</th>
					<th className="volume" name="total_volume" onClick={toggleOrderByColumn}>Volume</th>
					<th className="supply" name="circulating_supply" onClick={toggleOrderByColumn}>Circulation Supply</th>
				</tr>
			</CoinsTableHead>

			<CoinsTableBody>
				{data.map((crypto) => (
					<tr key={crypto.id} onClick={() => navigate(`/currency/${crypto.id}`)}>
						<td className="id">{crypto.market_cap_rank}</td>
						<td className="name">
							<Link to={`/currency/${crypto.id}`} onClick={(e) => e.stopPropagation()}>
								<img src={crypto.image} alt={crypto.id} />
								<span>{shortenString(crypto.name)}</span>
								<span className="symbol">{shortenString(crypto.symbol, 8)}</span>
							</Link>
						</td>
						<td className="price">{numeral(crypto.current_price).format('$0,0.00')}</td>
						<td className="change">{crypto.price_change_percentage_24h?.toFixed(2) ?? 0}%</td>
						<td className="marketCap">{numeral(crypto.market_cap).format('$0,0')}</td>
						<td className="volume">
							<span>{numeral(crypto.total_volume).format('$0,0')}</span>
							<span className="inCrypto">{numeral(crypto.total_volume / crypto.current_price).format('0,0')} {shortenString(crypto.symbol.toUpperCase(), 8)}</span>
						</td>
						<td className="supply">{numeral(crypto.circulating_supply).format('0,0')} {shortenString(crypto.symbol.toUpperCase(), 8)}</td>
					</tr>
				))}
			</CoinsTableBody>

			<tfoot>
				<tr>
					<td colSpan={7}>
						<Pagination
							totalPages={TOTAL_PAGES}
							currentPage={currentPage}
							onPageChange={setCurrentPage}
						/>
					</td>
				</tr>
			</tfoot>
		</CoinsTable>
	);
}

export default CoinsDashboard;
