'use client';

import React, { createContext, useContext, useState } from 'react';
import SolanaWalletProvider, {
  useWalletModal,
} from '@/components/wallet/SolanaWalletProvider';
import Navbar from './Navbar';
import { DepositModal, WithdrawModal } from '@/components/modals/Modals';
import { Market } from '@/types/market';

interface AppModalContextType {
  openDeposit: () => void;
  closeDeposit: () => void;
  openWithdraw: () => void;
  closeWithdraw: () => void;
  activeMarket?: Market;
  setActiveMarket: (market?: Market) => void;
}

const AppModalContext = createContext<AppModalContextType>({
  openDeposit: () => {},
  closeDeposit: () => {},
  openWithdraw: () => {},
  closeWithdraw: () => {},
  activeMarket: undefined,
  setActiveMarket: () => {},
});

export const useAppModals = () => useContext(AppModalContext);

interface AppShellProps {
  children: React.ReactNode;
  activeMarket?: Market;
}

function AppShellContent({ children, activeMarket }: AppShellProps) {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [currentMarket, setCurrentMarket] = useState<Market | undefined>(activeMarket);
  const { open: openWalletModal } = useWalletModal();

  return (
    <AppModalContext.Provider
      value={{
        openDeposit: () => setDepositOpen(true),
        closeDeposit: () => setDepositOpen(false),
        openWithdraw: () => setWithdrawOpen(true),
        closeWithdraw: () => setWithdrawOpen(false),
        activeMarket: currentMarket,
        setActiveMarket: setCurrentMarket,
      }}
    >
      <div className="flex min-h-screen flex-col bg-bg-primary text-white">
        <Navbar
          onDeposit={() => setDepositOpen(true)}
          onConnect={openWalletModal}
        />

        <main className="flex-1 min-h-0">{children}</main>

        <DepositModal
          isOpen={depositOpen}
          onClose={() => setDepositOpen(false)}
          market={currentMarket}
        />
        <WithdrawModal
          isOpen={withdrawOpen}
          onClose={() => setWithdrawOpen(false)}
        />
      </div>
    </AppModalContext.Provider>
  );
}

export default function AppShell({ children, activeMarket }: AppShellProps) {
  return (
    <SolanaWalletProvider>
      <AppShellContent activeMarket={activeMarket}>{children}</AppShellContent>
    </SolanaWalletProvider>
  );
}
