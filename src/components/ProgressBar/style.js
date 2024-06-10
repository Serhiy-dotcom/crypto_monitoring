import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
	width: 100%;
	height: 10px;
	background-color: #f3f3f3;
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid lightgray;
`;

export const FilledBar = styled.div`
	width: ${props => (props.percent >= 100 ? '100%' : `${props.percent}%`)};
	height: 100%;
	background-color: #3861FB;
	transition: width 0.3s ease-in-out;
	border-radius: 10px;
`;
