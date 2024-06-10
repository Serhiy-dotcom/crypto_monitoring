import { PaginationWrapper } from "./style";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePrevClick = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<PaginationWrapper>
			<button onClick={handlePrevClick} disabled={currentPage === 1}>
				Prev
			</button>
			<button onClick={handleNextClick} disabled={currentPage === totalPages}>
				Next
			</button>
		</PaginationWrapper>
	);
};

export default Pagination;
