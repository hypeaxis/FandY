'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Wallet,
  Copy,
  ExternalLink,
  LogOut,
  Check,
} from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { useSolanaAccount } from '@/hooks/useSolanaAccount';
import { useWalletModal } from '@/components/wallet/SolanaWalletProvider';

interface NavbarProps {
  onDeposit?: () => void;
  onConnect?: () => void;
}

export default function Navbar({ onDeposit, onConnect }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { open: openWalletModal } = useWalletModal();

  const {
    connected,
    connecting,
    shortAddress,
    address,
    balance,
    wallet,
    disconnect,
  } = useSolanaAccount();

  const handleConnect = () => {
    if (onConnect) {
      onConnect();
    } else {
      openWalletModal();
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setWalletDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = async () => {
    await disconnect();
    setWalletDropdownOpen(false);
  };

  return (
    <nav className="relative z-50 flex h-12 w-full items-center justify-between border-b border-border-default bg-bg-secondary px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="FandY Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/type=Logomark.png"
            alt="FandY"
            className="h-[22px] w-auto object-contain"
          />
          <span className="text-[20px] font-bold tracking-tight text-white leading-none">
            FandY
          </span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div
        className={cn(
          'hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center',
          mobileOpen &&
            'flex !absolute top-12 left-0 right-0 translate-x-0 translate-y-0 w-full flex-col bg-bg-secondary border-b border-border-default p-4 z-50'
        )}
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-1 rounded-full border border-brand-pink/40 bg-brand-pink/10 px-2.5 py-0.5 text-xs font-semibold text-brand-pink hover:bg-brand-pink/20 transition-colors"
          >
            Markets <span className="text-[9px] opacity-80">⭕</span>
          </Link>

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            Pools <span className="text-[11px]">🏛️</span>
          </Link>

          <Link
            href="/portfolio"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-bg-hover rounded-md transition-colors',
              pathname === '/portfolio' && 'text-white font-semibold'
            )}
          >
            Portfolio
          </Link>

          <Link
            href="/leaderboard"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-bg-hover rounded-md transition-colors',
              pathname === '/leaderboard' && 'text-white font-semibold'
            )}
          >
            Leaderboard
          </Link>

          <a
            href="https://sumptuous-carp-caa.notion.site/FandY-short-docs-2d4930c1ef0380ae8043cfded6c5e84d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-bg-hover rounded-md transition-colors"
          >
            Docs
          </a>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={onDeposit}
          className="rounded-full px-5 py-1 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-pink-glow"
          style={{
            background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
          }}
        >
          Deposit
        </button>

        {/* Wallet Button & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {connected ? (
            <button
              type="button"
              onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full border border-transparent bg-origin-border px-3 py-1 font-mono text-[11px] font-medium text-white transition-all hover:shadow-pink-glow-sm"
              style={{
                background:
                  'linear-gradient(#0E0D12, #0E0D12) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-long-green" />
              <span>{shortAddress}</span>
              <ChevronDown className="h-2.5 w-2.5 opacity-80" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              disabled={connecting}
              className="flex items-center gap-1.5 rounded-full border border-transparent bg-origin-border px-3.5 py-1 text-[11px] font-semibold text-white transition-all hover:shadow-pink-glow-sm"
              style={{
                background:
                  'linear-gradient(#0E0D12, #0E0D12) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
              }}
            >
              <Wallet className="h-3 w-3 text-brand-pink" />
              <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          )}

          {/* Connected Dropdown */}
          {connected && walletDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 z-50 flex w-64 flex-col overflow-hidden rounded-xl border border-border-default bg-bg-secondary p-2 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded bg-black/40 p-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        wallet?.adapter.name.toLowerCase().includes('solflare')
                          ? '/logo/Solfare.png'
                          : '/logo/Phantom-Icon_App.png'
                      }
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      {wallet?.adapter.name || 'Solana Wallet'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Devnet Connected
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-long-green" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="my-2 rounded-lg bg-bg-tertiary/60 p-2.5">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Balance
                </div>
                <div className="font-mono text-sm font-bold text-white mt-0.5">
                  {balance !== null
                    ? `${formatNumber(balance, { maximumFractionDigits: 4 })} SOL`
                    : 'Loading...'}
                </div>
              </div>

              <div className="flex flex-col gap-1 border-t border-white/5 pt-1 text-xs">
                {address && (
                  <a
                    href={`https://solscan.io/account/${address}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-neutral-300 hover:bg-bg-hover hover:text-white transition-colors"
                  >
                    <span>View on Solscan</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setWalletDropdownOpen(false);
                    handleConnect();
                  }}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-neutral-300 hover:bg-bg-hover hover:text-white transition-colors text-left"
                >
                  <span>Change Wallet</span>
                  <Wallet className="h-3 w-3 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-short-red hover:bg-short-red/10 transition-colors text-left font-medium"
                >
                  <span>Disconnect</span>
                  <LogOut className="h-3 w-3 opacity-80" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden p-1 text-neutral-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  );
}
