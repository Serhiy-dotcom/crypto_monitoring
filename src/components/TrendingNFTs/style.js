import styled from 'styled-components';

export const TrendingNFTsItem = styled.div`
	> div {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 20px;
	}

	img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	.name,
	.symbol {
		font-size: 13px;
	}

	.score {
		color: #808A9D;
	}

	.name {
		font-weight: 600;
	}

	.symbol {
		color: #808A9D;
		font-weight: 400;
	}

	.percentChange {
		margin-left: auto;
	}
`;

export const TrendingNFTsContainer = styled.div`
	width: 450px;
	border-radius: 10px;
	border: 1px solid lightgray;
	padding: 20px;
	box-shadow: 0px 5px 90px -70px rgba(0,0,0,0.7);

	.slick-dots {
		bottom: -15px;

		li {
			&.slick-active button::before {
				color: #3861FB;
			}

			button::before {
				font-size: 10px;
				color: #838892;
			}
		}
	}
`;

export const TrendingNFTsHeader = styled.div`
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
`;
