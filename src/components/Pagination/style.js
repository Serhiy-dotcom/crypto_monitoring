import styled from 'styled-components';

export const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;

	button {
		color: #fff;
		background-color: #3861FB;
		border: 0;
		border-radius: 5px;
		padding: 10px 20px;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;

		&:hover {
			background-color: #4F74FB;
		}

		&:disabled {
			background-color: lightgray;
			cursor: unset;
		}
	}
`;
