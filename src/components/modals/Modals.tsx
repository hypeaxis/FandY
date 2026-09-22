'use client';

import { useState, useEffect } from 'react';
import { Market } from '@/types/market';
import { X, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSolanaAccount } from '@/hooks/useSolanaAccount';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  market?: Market;
}

export function DepositModal({ isOpen, onClose, market }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState(market?.token || 'SOL');
  const [airdropping, setAirdropping] = useState(false);
  const [airdropMsg, setAirdropMsg] = useState<string | null>(null);
  const { connected, balance, requestAirdrop } = useSolanaAccount();

  useEffect(() => {
    if (market?.token) {
      setToken(market.token);
    }
  }, [market?.token]);

  if (!isOpen) return null;

  const handleAirdrop = async () => {
    setAirdropping(true);
    setAirdropMsg(null);
    const res = await requestAirdrop(1);
    setAirdropping(false);
    if (res.success) {
      setAirdropMsg('✅ Received 1 SOL Devnet successfully!');
    } else {
      setAirdropMsg(res.message || '⚠️ Airdrop failed');
    }
  };

  const availableDisplay =
    connected && balance !== null
      ? `${formatNumber(balance, { maximumFractionDigits: 4 })} SOL`
      : market
      ? `${formatNumber(market.available)} ${market.token}`
      : '3,636.36 SOL';

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border-default bg-bg-secondary shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-divider p-4">
          <div>
            <h3 className="text-base font-bold text-white">Deposit</h3>
            <p className="text-[11px] text-neutral-400">Solana Devnet Test Network</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-bg-hover hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-5">
          {connected && (
            <div className="flex flex-col gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-300">
                  Need test funds for Devnet?
                </span>
                <button
                  type="button"
                  onClick={handleAirdrop}
                  disabled={airdropping}
                  className="rounded-full bg-purple-600/30 px-3 py-1 text-[11px] font-semibold text-purple-200 hover:bg-purple-600/50 disabled:opacity-50 transition-colors"
                >
                  {airdropping ? 'Requesting...' : '🪂 Airdrop 1 SOL'}
                </button>
              </div>
              {airdropMsg && (
                <div className="text-[11px] font-medium text-neutral-300 mt-1">
                  {airdropMsg}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400">Token</label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-lg border border-border-default bg-bg-input px-3 py-2 text-xs font-medium text-white outline-none focus:border-brand-pink"
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400">Amount</label>
            <input
              type="text"
              className="w-full rounded-lg border border-border-default bg-bg-input px-3 py-2 font-mono text-sm text-white placeholder-neutral-500 outline-none focus:border-brand-pink"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Available on wallet:</span>
            <span className="font-mono font-semibold text-white">
              {availableDisplay}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-lg py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-pink-glow"
            style={{
              background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
            }}
          >
            Confirm Deposit
          </button>
        </div>
      </div>
    </div>
  );
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('SOL');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border-default bg-bg-secondary shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-divider p-4">
          <h3 className="text-base font-bold text-white">Withdraw</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-bg-hover hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400">Token</label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-lg border border-border-default bg-bg-input px-3 py-2 text-xs font-medium text-white outline-none focus:border-brand-pink"
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400">Amount</label>
            <input
              type="text"
              className="w-full rounded-lg border border-border-default bg-bg-input px-3 py-2 font-mono text-sm text-white placeholder-neutral-500 outline-none focus:border-brand-pink"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-lg py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-pink-glow"
            style={{
              background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
            }}
          >
            Confirm Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { wallets: adapterWallets, select } = useWallet();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  if (!isOpen) return null;

  const supportedWallets = [
    {
      name: 'Phantom',
      adapterName: 'Phantom',
      icon: '/logo/Phantom-Icon_App.png',
      url: 'https://phantom.app/',
    },
    {
      name: 'Solflare',
      adapterName: 'Solflare',
      icon: '/logo/Solfare.png',
      url: 'https://solflare.com/',
    },
    {
      name: 'WalletConnect',
      adapterName: 'WalletConnect',
      icon: '/logo/WalletConnect.png',
      url: 'https://walletconnect.com/',
    },
  ];

  const handleConnect = async (walletInfo: (typeof supportedWallets)[0]) => {
    setConnectingWallet(walletInfo.name);

    // Find the matching adapter from Solana wallet adapter
    const target = adapterWallets.find(
      (w) =>
        w.adapter.name.toLowerCase() === walletInfo.adapterName.toLowerCase() ||
        w.adapter.name.toLowerCase().includes(walletInfo.name.toLowerCase())
    );

    if (target) {
      try {
        select(target.adapter.name);
        await target.adapter.connect();
        onClose();
      } catch (err) {
        console.warn('Wallet connection dismissed or failed:', err);
      } finally {
        setConnectingWallet(null);
      }
    } else {
      // If extension is not detected in browser, direct user to install
      window.open(walletInfo.url, '_blank');
      setConnectingWallet(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border-default bg-bg-secondary shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-divider p-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              Connect a wallet on Solana to continue
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Select your preferred Solana wallet
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-bg-hover hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2 p-4">
          {supportedWallets.map((w) => {
            const detectedAdapter = adapterWallets.find(
              (aw) =>
                aw.adapter.name.toLowerCase() === w.adapterName.toLowerCase() ||
                aw.adapter.name.toLowerCase().includes(w.name.toLowerCase())
            );

            const isInstalled = detectedAdapter?.readyState === 'Installed';
            const isConnecting = connectingWallet === w.name;

            return (
              <button
                key={w.name}
                type="button"
                className="flex items-center justify-between rounded-xl border border-border-default bg-bg-tertiary/40 px-4 py-3 text-xs font-semibold text-white transition-all hover:border-brand-pink hover:bg-bg-hover group"
                onClick={() => handleConnect(w)}
                disabled={isConnecting}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/30 p-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.icon}
                      alt={w.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-medium">{w.name}</span>
                    <span className="text-[10px] text-neutral-500">
                      {isInstalled ? (
                        <span className="text-long-green flex items-center gap-1">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Detected
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          Click to install / connect <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {isConnecting ? (
                  <span className="text-[11px] text-brand-pink animate-pulse">
                    Connecting...
                  </span>
                ) : (
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
