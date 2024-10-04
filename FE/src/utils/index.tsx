export const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formattedNumberWithComma = (
  number: number | string,
  minimumFractionDigits: number = 2
) => {
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits,
  });
};
