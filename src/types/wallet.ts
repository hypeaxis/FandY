import { PublicKey } from '@solana/web3.js';
import { WalletName } from '@solana/wallet-adapter-base';

export interface SupportedWalletOption {
  name: string;
  adapterName: string;
  icon: string;
  url: string;
  description: string;
}

export interface SolanaAccountState {
  publicKey: PublicKey | null;
  address: string | null;
  shortAddress: string;
  connected: boolean;
  connecting: boolean;
  balance: number | null;
  loading: boolean;
  refreshBalance: () => Promise<void>;
  select: (walletName: WalletName) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
