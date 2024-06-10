import styled from 'styled-components';

export const NavBarWrapper = styled.ul`
	position: static;
	top: 0;
	border-top: 2px solid lightgray;
	border-bottom: 2px solid lightgray;
	padding: 30px 40px;
	display: flex;
	align-items: center;
	gap: 20px;
	list-style: none;
`;

export const NavItem = styled.li`
	display: flex;
	gap: 3px;
	font-weight: 500;
	color: gray;

	> span {
		color: #3861FB;
	}
`;

export const RightNavItem = styled(NavItem)`
	margin-left: auto;
`;

export const SearchBoxContainer = styled.div`
`;

export const SearchBoxBtn = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	width: 250px;
	border-radius: 5px;
	border: 0;
	background-color: #EFF2F5;
	padding: 5px 10px 5px 20px;
	font-size: 18px;
	cursor: pointer;

	span {
		color: gray;

		&.keyShortcut {
			width: 25px;
			height: 25px;
			border-radius: 3px;
			background-color: #A6B0C3;
			color: #fff;
			margin-left: auto;
			text-align: center;
			align-content: center;
		}
	}
`;

export const SearchBoxModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const SearchBoxModal = styled.div`
	display: flex;
	flex-direction: column;
	width: 80vw;
	max-width: 750px;
	height: 70vh;
	max-height: 450px;
	border-radius: 15px;
	background-color: #fff;
	box-shadow: 10px 10px 100px -40px rgba(0,0,0,0.75);
	padding: 20px;
`;

export const SearchBoxInput = styled.input`
	width: calc(100% - 40px);
	background-color: #EFF2F5;
	border: 0;
	border-radius: 5px;
	font-size: 20px;
	padding: 15px 20px;
`;

export const SearchBoxCategories = styled.div`
	display: flex;
	gap: 20px;
	margin: 20px 0;

	button {
		background-color: #EFF2F5;
		border-radius: 20px;
		padding: 10px 20px;
		color: #000;
		cursor: pointer;
		border: 0;
		font-weight: 500;

		&.active {
			background-color: #F0F6FF;
			color: #3861FB;
		}
	}
`;

export const SearchBoxResult = styled.ul`
	list-style: none;
	padding: 0;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: content-box;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.7);
	}
`;

export const SearchBoxResultItem = styled.li`
	a {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		padding: 10px;
		border-radius: 5px;

		img {
			width: 30px
		}

		.name {
			color: #000;
			font-size: 20px;
		}

		.symbol {
			font-size: 16px;
		}

		.rank {
			border-radius: 5px;
			background-color: #EFF2F5;
			padding: 3px 5px;
			font-size: 14px;
			margin-left: auto;
		}

		.symbol,
		.rank {
			color: gray;
		}

		&:hover {
			background-color: #eeeff0;
		}
	}
`;

export const SearchNoResult = styled.div`
	font-size: 25px;
	margin: auto;
`;

export const NavigationWrapper = styled.div`
	position: relative;

	button {
		display: flex;
		align-items: center;
		gap: 15px;
		background-color: #f4f7fb;
		padding: 10px 15px;
		border-radius: 8px;
		font-size: 16px;
		color: #4a5568;
		width: 100%;
		height: 40px;
		cursor: pointer;
		border: none;

		&:hover {
			background-color: #e2e8f0;
		}
	}

	ul {
		position: absolute;
		top: 100%;
		width: 100%;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		background-color: #fff;
		border: 1px solid lightgray;
		border-radius: 10px;
		overflow: hidden;

		li a {
			width: 100%;
			display: block;
			padding: 10px;
			text-decoration: none;
			color: #000;
			
			&:hover {
				background-color: #dde1e9;
			}
		}
	}
`;
