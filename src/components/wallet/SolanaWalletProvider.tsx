'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletConnectModal } from '@/components/modals/Modals';

interface WalletModalContextType {
  visible: boolean;
  setVisible: (open: boolean) => void;
  open: () => void;
  close: () => void;
}

const WalletModalContext = createContext<WalletModalContextType>({
  visible: false,
  setVisible: () => {},
  open: () => {},
  close: () => {},
});

export const useWalletModal = () => useContext(WalletModalContext);

interface SolanaWalletProviderProps {
  children: React.ReactNode;
}

export default function SolanaWalletProvider({
  children,
}: SolanaWalletProviderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const network =
    (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) ||
    WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => {
    if (process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
      return process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
    }
    return clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalContext.Provider
          value={{
            visible: modalOpen,
            setVisible: setModalOpen,
            open: () => setModalOpen(true),
            close: () => setModalOpen(false),
          }}
        >
          {children}
          <WalletConnectModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </WalletModalContext.Provider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
