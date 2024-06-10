import styled from "styled-components";

export const ScannerWrapper = styled.div`
	margin: 50px;
`;

export const ScannerConfig = styled.div`

`;

export const ChainInput = styled.input`
	width: -webkit-fill-available;
	padding:10px 15px;
	font-size: 20px;
	border-radius: 10px;
	margin-top: 20px;
	border: 1px solid gray;
`;

export const ScannerData = styled.div`
	display: flex;
	gap: 30px;
	flex-wrap: wrap;
	margin-top: 40px;
`;

export const ScannerCard = styled.div`
	border: 1px solid lightgray;
	width: 30%;
	border-radius: 10px;
	padding: 15px;
`;

export const ScannerCardName = styled.h3`

`;

export const ScannerCardInfo = styled.div`
	h4 {
		font-weight: normal;
		color: gray;
		margin-top: 15px;
	}

	label input {
		margin: 0 5px;
	}
`;

export const ScannerTransactions = styled.div`
	margin-top: 40px;
`;

export const TransactionTypes = styled.div`
	display: flex;
	gap: 20px;

	button {
		background-color: #f2f2f2;
		cursor: pointer;
		border: 1px solid lightgray;
		padding: 10px 15px;
		border-radius: 10px;
		font-weight: 600;

		&:hover{
			background-color: #E9ECEF;
		}

		&.active {
			color: #fff;
			background-color: #0784C3;
		}
	}

	select {
		margin-left: auto;
		padding: 10px;
		font-weight: 600;
		border: 2px solid lightgray;
		cursor: pointer;
	}
`;

export const TransactionsTable = styled.table`
	margin-top: 20px;
	width: 100%;
	border-collapse: collapse;

	thead {
		background-color: #007bff;
		color: #fff;
	}

	th,
	td {
		padding: 12px 15px;
		text-align: left;
	}

	th {
		font-weight: bold;
	}

	tbody tr:nth-child(odd) {
		background-color: #f9f9f9;
	}

	tbody tr:nth-child(even) {
		background-color: #fff;
	}

	tbody tr:hover {
		background-color: #f1f1f1;
	}

	tbody td {
		border-bottom: 1px solid #ddd;
	}

	tbody td.shortenValue i {
		margin-left: 10px;
		cursor: pointer;
	}	
`;

export const TransactionsPagination = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin: 20px auto;
	width: fit-content;

	span {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border: 1px solid lightgray;
		border-radius: 5px;
	}

	button {
		border: 1px solid lightgray;
		height: 30px;
		padding: 0 20px;
		border-radius: 3px;
		background-color: #F2F2F2;

		&:hover {
			color: #fff;
			background-color: #007BFF;
			cursor: pointer;
		}

		&:disabled {
			background-color: #FAFAFA;
			color: gray;
			cursor: default;
		}
	}
`;
