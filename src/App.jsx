import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import MarketPage from './pages/MarketPage';
import { PortfolioPage, LeaderboardPage } from './pages/ComingSoon';
import { DepositModal, WithdrawModal, WalletConnectModal } from './components/modals/Modals';
import { useMarketData } from './hooks/useMarketData';
import './App.css';

function AppContent() {
  const marketData = useMarketData();
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  return (
    <>
      <Navbar
        onDeposit={() => setDepositOpen(true)}
        onConnect={() => setWalletOpen(true)}
      />

      <Routes>
        <Route path="/" element={
          <MarketPage
            marketData={marketData}
            onDeposit={() => setDepositOpen(true)}
            onWithdraw={() => setWithdrawOpen(true)}
          />
        } />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>

      <DepositModal isOpen={depositOpen} onClose={() => setDepositOpen(false)} market={marketData.selectedMarket} />
      <WithdrawModal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
      <WalletConnectModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
