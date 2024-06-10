import { ToastContainer } from 'react-toastify';

import NavBar from "../NavBar";

import { Wrapper } from './style';

const GeneralWrapper = ({ component }) => {
	return (
		<Wrapper>
			<NavBar />

			<ToastContainer />

			{component}
		</Wrapper>
	);
};

export default GeneralWrapper;
