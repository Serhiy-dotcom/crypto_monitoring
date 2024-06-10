import styled from 'styled-components';

export const CurrencyWrapper = styled.div`
	display: flex;
`;

export const ChartWrapper = styled.div`
	width: calc(100vw - 380px);
`;

export const CurrencySidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	height: calc(100vh - 145px);
	margin-right: 20px;
`;

export const CurrencyName = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	img {
		width: 25px;
	}

	.text {
		display: flex;
		gap: 8px;
		align-items: baseline;

		.name {
			font-size: 18px;
			font-weight: 500;
		}

		.symbol {
			font-size: 12px;
			text-transform: uppercase;
			color: #616E85;
			line-height: 18px;
		}
	}
`;

export const CurrencyPrice = styled.div`
	font-weight: 700;
	font-size: 40px;
`;

export const CurrencyMarketData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	.data {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin-bottom: 5px;
	}

	p {
		font-size: 14px;
		font-weight: bold;
	}

	.info {
		display: flex;
		align-items: center;
		gap: 15px;
		flex-wrap: wrap;
		font-size: 14px;

		span a {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 14px;
			color: #000;
    		text-decoration: none;
			background-color: #EFF2F5;
			padding: 5px 10px;
			border-radius: 8px;
			width: fit-content;
			font-weight: 500;

			i {
				color: #808A9D;
				font-size: 16px;
			}
		}
	}
`;

export const CurrencyConverter = styled.div`
	width: 310px;

	.name {
		font-size: 14px;
		font-weight: 500;
	}

	.converterInputs {
		display: flex;
		border: 4px solid #EFF2F5;
		border-radius: 7px;
		margin-top: 5px;

		label {
			display: flex;
			color: #616E85;
			width: 50%;
			padding: 5px 10px;
			font-size: 14px;

			&:first-child {
				border-right: 2px solid #EFF2F5;
			}

			input {
				width: 100%;
				border: 0;
				outline: none;
				text-align: right;
			}
		}
	}
`;

export const CurrencyInfo = styled.div`
	display: flex;
	flex-direction: column;

	h1 {
		margin: 30px 0 20px;
	}

	p {
		font-size: 18px;
		margin-right: 20px;

		a {
			text-decoration: none;
		}
	}
`;

export const ChartConfiguration = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin: 20px;
`;

export const ChartTypes = styled.ul`
	display: flex;
	align-items: center;
	gap: 3px;
	list-style: none;
	background-color: #EFF2F5;
	padding: 3px;
	border-radius: 10px;

	li button {
		padding: 10px;
		color: #616e85;
		border: 0;
		border-radius: 7px;
		font-weight: 600;
		cursor: pointer;

		&.active {
			background-color: #fff !important;
		}

		&:hover {
			background-color: #d6d6d6;
		}
	}
`;

export const ChartTimeframes = styled(ChartTypes)`
	margin-left: auto;
`;
