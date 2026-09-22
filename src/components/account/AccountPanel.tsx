'use client';

import { useState } from 'react';
import { AccountSummary } from '@/types/account';
import { Market } from '@/types/market';
import { cn, formatNumber } from '@/lib/utils';
import { useSolanaAccount } from '@/hooks/useSolanaAccount';
import { useAppModals } from '@/components/layout/AppShell';

interface AccountPanelProps {
  account: AccountSummary;
  market?: Market;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

export default function AccountPanel({
  account,
  market,
  onDeposit,
  onWithdraw,
}: AccountPanelProps) {
  const [activeAction, setActiveAction] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');
  const { connected, balance } = useSolanaAccount();
  const { openDeposit, openWithdraw } = useAppModals();

  const handleAction = (action: 'deposit' | 'withdraw' | 'transfer') => {
    setActiveAction(action);
    if (action === 'deposit') {
      if (onDeposit) onDeposit();
      else openDeposit();
    }
    if (action === 'withdraw') {
      if (onWithdraw) onWithdraw();
      else openWithdraw();
    }
  };

  const displayTotalValue =
    connected && balance !== null
      ? `${formatNumber(balance, { maximumFractionDigits: 4 })} SOL`
      : `${formatNumber(account.totalValue)} ${account.token}`;

  return (
    <div className="flex h-full w-full flex-col gap-3 p-3 text-xs bg-transparent">
      {/* Header & Actions */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Account</h3>
          {connected ? (
            <span className="flex items-center gap-1 text-[10px] text-long-green font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-long-green" />
              Wallet Live
            </span>
          ) : (
            <span className="text-[10px] text-neutral-500 font-medium">
              Not Connected
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            className={cn(
              'rounded-full py-1 text-center font-semibold text-[11px] transition-all',
              activeAction === 'deposit'
                ? 'text-white shadow-pink-glow'
                : 'text-neutral-300 hover:text-white'
            )}
            style={{
              background:
                activeAction === 'deposit'
                  ? 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)'
                  : 'linear-gradient(#131118, #131118) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
              border: '1px solid transparent',
            }}
            onClick={() => handleAction('deposit')}
          >
            Deposit
          </button>

          <button
            type="button"
            className={cn(
              'rounded-full py-1 text-center font-semibold text-[11px] transition-all',
              activeAction === 'withdraw'
                ? 'text-white shadow-pink-glow'
                : 'text-neutral-300 hover:text-white'
            )}
            style={{
              background:
                activeAction === 'withdraw'
                  ? 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)'
                  : 'linear-gradient(#131118, #131118) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
              border: '1px solid transparent',
            }}
            onClick={() => handleAction('withdraw')}
          >
            Withdraw
          </button>

          <button
            type="button"
            className={cn(
              'rounded-full py-1 text-center font-semibold text-[11px] transition-all',
              activeAction === 'transfer'
                ? 'text-white shadow-pink-glow'
                : 'text-neutral-300 hover:text-white'
            )}
            style={{
              background:
                activeAction === 'transfer'
                  ? 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)'
                  : 'linear-gradient(#131118, #131118) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
              border: '1px solid transparent',
            }}
            onClick={() => handleAction('transfer')}
          >
            Transfer
          </button>
        </div>
      </div>

      {/* Account Equity Section */}
      <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-bg-tertiary/40 p-2.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Account Equity
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400">Total Value</span>
          <span className="font-mono font-semibold text-white">
            {displayTotalValue}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400">Unrealized PNL</span>
          <span
            className={cn(
              'font-mono font-semibold',
              account.unrealizedPNL >= 0 ? 'text-long-green' : 'text-short-red'
            )}
          >
            {account.unrealizedPNL >= 0 ? '+' : '-'}$
            {formatNumber(Math.abs(account.unrealizedPNL))}
          </span>
        </div>
        {account.unrealizedPNLToken !== 0 && (
          <div className="flex justify-between items-center text-[10px] text-neutral-500">
            <span />
            <span className="font-mono">
              {account.unrealizedPNLToken} {account.token}
            </span>
          </div>
        )}
      </div>

      {/* Margin Section */}
      <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-bg-tertiary/40 p-2.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Margin
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400">Margin Ratio</span>
          <div className="flex items-center gap-1.5">
            <svg width="24" height="24" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="none"
                stroke="#2B2228"
                strokeWidth="3"
              />
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="none"
                stroke={
                  account.marginRatio > 50
                    ? '#10B981'
                    : account.marginRatio > 20
                    ? '#EAB308'
                    : '#EF4444'
                }
                strokeWidth="3"
                strokeDasharray={`${(account.marginRatio / 100) * 81.68} 81.68`}
                strokeLinecap="round"
                transform="rotate(-90 16 16)"
              />
            </svg>
            <span className="font-mono font-semibold text-white">
              {account.marginRatio.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400">Maintenance Margin</span>
          <span className="font-mono text-white">
            {formatNumber(account.maintenanceMargin)} {account.token}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400">Margin Balance</span>
          <span className="font-mono text-white">
            {formatNumber(account.marginBalance)} {account.token}
          </span>
        </div>
      </div>
    </div>
  );
}
