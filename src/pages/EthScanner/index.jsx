import { useState } from 'react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import shortenString from '../../utils/shortenString';
import shortenMiddleString from '../../utils/shortenMiddleString';

import {
	useEthAccountBalance,
	useEthLatestPrice,
	useEthTransactionList,
	useEthStats,
	useEthGasOracle,
	useEthGasTimeCalculation
} from '../../hooks/scanner/eth';

import { showErrorNotif, showSuccessNotif } from '../../utils/notify';

import {
	ScannerWrapper,
	ScannerConfig,
	ChainInput,
	ScannerData,
	ScannerCard,
	ScannerCardName,
	ScannerCardInfo,
	ScannerTransactions,
	TransactionTypes,
	TransactionsTable,
	TransactionsPagination
} from './style';

dayjs.extend(relativeTime);

const EthScanner = () => {
	const [address, setAddress] = useState('0x0a6bc3dDE30b6895A41Ef0b89a5324bbd1dbE875');
	const [transactionListType, setTransactionListType] = useState('txlist');
	const [gasPrice, setGasPrice] = useState(null);
	const [page, setPage] = useState(1);
	const [offset, setOffset] = useState(25);

	const { data: ethAccountBalance } = useEthAccountBalance(address);
	const { data: ethLatestPrice } = useEthLatestPrice(address);
	const { data: ethStats } = useEthStats();
	const { data: ethGasInfo } = useEthGasOracle(address);
	const { data: ethGasTime } = useEthGasTimeCalculation(gasPrice);
	const { data: transactions } = useEthTransactionList(address, page, offset, transactionListType);


	const handlePushToBuffer = async (trxHash) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(trxHash).then(() => {
				showSuccessNotif('Successfully copied!');
			}).catch((err) => {
				showErrorNotif('Failed to copy.');
			});
		}
	};

	const handleOffsetChange = (e) => {
		setPage(1);
		setOffset(e.target.value);
	};

	return (
		<ScannerWrapper>
			<ScannerConfig>
				<h1>Ethereum Scanner</h1>

				<ChainInput placeholder="Search by Address" value={address} onChange={(e) => setAddress(e.target.value)} />
			</ScannerConfig>

			<ScannerData>
				<ScannerCard>
					<ScannerCardName>Overview</ScannerCardName>

					<ScannerCardInfo>
						<h4>ETH BALANCE</h4>
						<span>{ethAccountBalance ?? 0} ETH</span>

						<h4>ETH VALUE</h4>
						<span>{numeral(ethLatestPrice * ethAccountBalance).format((ethLatestPrice * ethAccountBalance) > 1 ? '$0,0.00' : '$0,0.000000')} ({numeral(ethLatestPrice).format(ethLatestPrice > 1 ? '$0,0.00' : '$0,0.000000')}/ETH)</span>
					</ScannerCardInfo>
				</ScannerCard>

				<ScannerCard>
					<ScannerCardName>More Info</ScannerCardName>

					<ScannerCardInfo>
						<h4>ETH SUPPLY</h4>
						<span>{ethStats?.ethSupply} ETH</span>

						<h4>ETH STAKED</h4>
						<span>{ethStats?.ethStaked} ETH</span>

						<h4>BURNT ON FEES</h4>
						<span>{ethStats?.burntFees} ETH</span>

						<h4>TOTAL WITHDRAWN</h4>
						<span>{ethStats?.totalWithdrawn} ETH</span>
					</ScannerCardInfo>
				</ScannerCard>

				<ScannerCard>
					<ScannerCardName>Gas Info</ScannerCardName>

					<ScannerCardInfo>
						<h4>SAFE GAS PRICE</h4>
						<span>{ethGasInfo?.safeGasPrice} Gwei</span>

						<h4>SUGGESTED GAS PRICE</h4>
						<span>{ethGasInfo?.proposeGasPrice} Gwei</span>

						<h4>FAST GAS PRICE</h4>
						<span>{ethGasInfo?.fastGasPrice} Gwei</span>

						<h4>GAS PRICE OF NEXT PENDING BLOCK</h4>
						<span>{ethGasInfo?.suggestBaseFee} Gwei</span>

						<h4>CALCULATE TIME FOR GAS PRICE</h4>
						<label htmlFor="gasInput">
							Gas (in wei):
							<input type="text" id="gasInput" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} />
							≈ {ethGasTime} minutes
						</label>
					</ScannerCardInfo>
				</ScannerCard>
			</ScannerData>

			<ScannerTransactions>
				<TransactionTypes>
					<button
						onClick={() => setTransactionListType('txlist')}
						className={transactionListType === 'txlist' ? 'active': ''}
					>Transactions</button>

					<button
						onClick={() => setTransactionListType('txlistinternal')}
						className={transactionListType === 'txlistinternal' ? 'active': ''}
					>Internal Transactions</button>

					<select value={offset} onChange={handleOffsetChange}>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</TransactionTypes>

				<TransactionsTable>
					<thead>
						<tr>
							<th>Transaction Hash</th>
							<th>Block</th>
							<th>Age</th>
							<th>From</th>
							<th>To</th>
							<th>Value</th>
							<th>Txn Fee</th>
							<th>Confirmations</th>
						</tr>
					</thead>

					<tbody>
						{Array.isArray(transactions) && transactions?.map((transaction) => (
							<tr>
								<td className="shortenValue">
									{shortenString(transaction.hash, 13)}
									<i class="fa-regular fa-clipboard" onClick={() => handlePushToBuffer(transaction.hash)}></i>	
								</td>
								<td>{transaction.blockNumber}</td>
								<td>{dayjs.unix(transaction.timeStamp).fromNow()}</td>
								<td className="shortenValue">
									{shortenMiddleString(transaction.from)}
									<i class="fa-regular fa-clipboard" onClick={() => handlePushToBuffer(transaction.from)}></i>	
								</td>
								<td className="shortenValue">
									{shortenMiddleString(transaction.to)}
									<i class="fa-regular fa-clipboard" onClick={() => handlePushToBuffer(transaction.to)}></i>	
								</td>
								<td>{transaction.value * 0.000000000000000001} ETH</td>
								<td>{transaction.gasUsed / 10 ** 8}</td>
								<td>{transaction.confirmations}</td>
							</tr>
						))}
					</tbody>
				</TransactionsTable>

				<TransactionsPagination>
					<button disabled={page <= 1} onClick={() => setPage((prevData) => prevData - 1)}>Prev</button>
					<span>{page}</span>
					<button onClick={() => setPage((prevData) => prevData + 1)}>Next</button>
				</TransactionsPagination>
			</ScannerTransactions>
		</ScannerWrapper>
	);
};

export default EthScanner;
