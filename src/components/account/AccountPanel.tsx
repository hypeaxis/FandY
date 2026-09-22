'use client';

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
  const { connected, balance } = useSolanaAccount();
  const { openDeposit, openWithdraw } = useAppModals();

  const handleDeposit = () => {
    if (onDeposit) onDeposit();
    else openDeposit();
  };

  const handleWithdraw = () => {
    if (onWithdraw) onWithdraw();
    else openWithdraw();
  };

  const handleTransfer = () => {
    // Optional transfer action
  };

  const displayTotalValue =
    connected && balance !== null
      ? `${formatNumber(balance, { maximumFractionDigits: 4 })} SOL`
      : `${formatNumber(account.totalValue)} ${account.token}`;

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2.5 text-xs bg-transparent">
      {/* Top Action Buttons: Deposit, Withdraw, Transfer */}
      <div className="grid grid-cols-3 gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleDeposit}
          className="rounded-full py-1.5 text-center font-semibold text-[11px] text-white shadow-pink-glow transition-all hover:opacity-95"
          style={{
            background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
            border: '1px solid transparent',
          }}
        >
          Deposit
        </button>

        <button
          type="button"
          onClick={handleWithdraw}
          className="rounded-full py-1.5 text-center font-semibold text-[11px] text-neutral-300 hover:text-white transition-all hover:shadow-pink-glow-sm"
          style={{
            background:
              'linear-gradient(#131118, #131118) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
            border: '1px solid transparent',
          }}
        >
          Withdraw
        </button>

        <button
          type="button"
          onClick={handleTransfer}
          className="rounded-full py-1.5 text-center font-semibold text-[11px] text-neutral-300 hover:text-white transition-all hover:shadow-pink-glow-sm"
          style={{
            background:
              'linear-gradient(#131118, #131118) padding-box, linear-gradient(90deg, #F531AB 0%, #8F1D64 100%) border-box',
            border: '1px solid transparent',
          }}
        >
          Transfer
        </button>
      </div>

      {/* Account Equity Section */}
      <div className="flex flex-col gap-1 rounded-lg border border-white/5 bg-bg-tertiary/40 p-2">
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
      <div className="flex flex-col gap-1 rounded-lg border border-white/5 bg-bg-tertiary/40 p-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Margin
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400">Margin Ratio</span>
          <div className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 32 32">
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
