import styled from 'styled-components';

export const CoinsTable = styled.table`
	width: 100%;
	max-width: 1300px;
	border-collapse: collapse;
	margin: 0 auto;

	th,
	td {
		padding: 20px 10px;
		text-align: right;
		font-weight: 500;
		color: #222531;

		&.id {
			text-align: center;
		}

		&.name {
			text-align: left;
		}
	}
`;

export const CoinsTableHead = styled.thead`
	th {
		cursor: pointer;
	}
`;

export const CoinsTableBody = styled.tbody`
	tr {
		vertical-align: middle;
		border-top: 2px solid #EFF2F5;

		&:hover {
			cursor: pointer;
			background-color: #F4F7FA;
		}
	}

	.id {
		color: #58667E;
	}

	.name > a {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: inherit;

		img {
			width: 30px;
			border-radius: 50%;
		}

		.symbol {
			color: #808A9D;
			text-transform: uppercase;
		}
	}

	.volume {
		display: flex;
		flex-direction: column;
		gap: 5px;

		.inCrypto {
			font-size: 14px;
			color: #58667E;
		}
	}
`;
