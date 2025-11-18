export interface Chain {
  value: string;
  name: string;
  chainId: string;
  coin: string;
  derpUrl: string;
  originalUrl: string;
  blockExplorerUrl: string;
}

export const chains: Chain[];
