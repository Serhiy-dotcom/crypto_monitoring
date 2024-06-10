const shortenMiddleString = (text, maxLength = 20) => {
	if (text.length <= maxLength) return text;
  
	const halfLength = Math.floor((maxLength - 3) / 2);
	const start = text.slice(0, halfLength);
	const end = text.slice(text.length - halfLength);
  
	return `${start}...${end}`;
}

export default shortenMiddleString;
