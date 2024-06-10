import React from 'react';

import { ProgressBarContainer, FilledBar } from './style';

const ProgressBar = ({ maxValue, currentValue }) => {
	const percentFilled = (currentValue / (maxValue ?? currentValue)) * 100;

	return (
		<ProgressBarContainer>
			<FilledBar percent={percentFilled} />
		</ProgressBarContainer>
	);
};

export default ProgressBar;