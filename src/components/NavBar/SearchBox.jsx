import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCryptoSearch } from '../../hooks/swr';

import {
	SearchBoxContainer,
	SearchBoxBtn,
	SearchBoxInput,
	SearchBoxCategories,
	SearchBoxModalWrapper,
	SearchBoxModal,
	SearchBoxResult,
	SearchBoxResultItem,
	SearchNoResult
} from './style';

const searchCategoriesList = [['coins', 'Coins'], ['exchanges', 'Exchanges'], ['nfts', 'NFTs']];

const SearchBox = () => {
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchCategory, setSearchCategory] = useState('coins');

	const { data, isLoading, error } = useCryptoSearch(searchQuery);

	const handleSearch = (e) => setSearchQuery(e.target.value);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error</div>

	return (
		<SearchBoxContainer>
			<SearchBoxBtn onClick={() => setShowSearchModal(true)}>
				<span className="text">Search</span>
				<span className="keyShortcut">/</span>
			</SearchBoxBtn>

			{showSearchModal && (
				<SearchBoxModalWrapper onClick={() => setShowSearchModal(false)}>
					<SearchBoxModal onClick={(e) => e.stopPropagation()}>
						<SearchBoxInput placeholder="Search" onChange={handleSearch} />

						<SearchBoxCategories>
							{searchCategoriesList.map(([key, name]) => (
								<button
									className={key === searchCategory ? 'active': ''}
									onClick={() => setSearchCategory(key)}
								>{name}</button>
							))}
						</SearchBoxCategories>

						{data[searchCategory].length ? (
							<SearchBoxResult>
								{data[searchCategory].map(({ id, name, symbol, market_cap_rank, large, thumb }) => (
									<SearchBoxResultItem key={id}>
										<Link to={`/currency/${id}`} onClick={() => setShowSearchModal(false)}>
											<img src={large ?? thumb} alt={name} />
											<span className="name">{name}</span>
											<span className="symbol">{symbol}</span>
											<span className="rank">#{market_cap_rank}</span>
										</Link>
									</SearchBoxResultItem>
								))}
							</SearchBoxResult>
						) : <SearchNoResult>Nothing found</SearchNoResult>}
					</SearchBoxModal>
				</SearchBoxModalWrapper>
			)}
		</SearchBoxContainer>
	);
};

export default SearchBox;
