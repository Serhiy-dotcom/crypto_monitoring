const shortenString = (str, shortenBy = 20) => str.length <= shortenBy ? str : `${str.substring(0, shortenBy)}...`;

export default shortenString;
