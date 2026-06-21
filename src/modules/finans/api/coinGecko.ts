export interface BitcoinPrice {
  usd: number;
  usd_24h_change: number;
}

export async function fetchBitcoinPrice(): Promise<BitcoinPrice> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return {usd: 62_450, usd_24h_change: 2.34};
}
