'use client';

import { useState } from 'react';
import { Market } from '@/types/market';
import { MarginMode, PositionMode, OrderType, TradeSide } from '@/types/trading';
import { cn, formatNumber } from '@/lib/utils';
import { ChevronDown, Wallet, CheckCircle } from 'lucide-react';
import { useSolanaAccount } from '@/hooks/useSolanaAccount';
import { useWalletModal } from '@/components/wallet/SolanaWalletProvider';

interface OrderFormProps {
  market: Market;
  marginMode: MarginMode;
  setMarginMode: (mode: MarginMode) => void;
  leverage: number;
  setLeverage: (lev: number) => void;
  positionMode?: PositionMode;
  setPositionMode?: (mode: PositionMode) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  side: TradeSide;
  setSide: (side: TradeSide) => void;
}

export default function OrderForm({
  market,
  marginMode,
  setMarginMode,
  leverage,
  setLeverage,
  positionMode = 'One-way',
  setPositionMode,
  orderType,
  setOrderType,
  side,
  setSide,
}: OrderFormProps) {
  const [amount, setAmount] = useState('0');
  const [aprInput, setAprInput] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { connected, balance } = useSolanaAccount();
  const { open: openWalletModal } = useWalletModal();

  const leverageMarks = [0, 25, 50, 75, 100];

  return (
    <div className="flex h-full w-full flex-col gap-2.5 p-3.5 text-xs bg-transparent">
      {/* Title */}
      <div className="text-center text-sm font-semibold text-white">Order</div>

      {/* Mode Row: Cross / 20x / One-way */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 rounded-lg border border-white/10 bg-[#16131D] px-2 py-1">
        {/* Margin mode */}
        <div className="flex items-center justify-center">
          <select
            className="cursor-pointer appearance-none bg-transparent text-center font-medium text-white outline-none"
            value={marginMode}
            onChange={(e) => setMarginMode(e.target.value as MarginMode)}
          >
            <option value="Cross" className="bg-[#1A1624] text-white">
              Cross
            </option>
            <option value="Isolated" className="bg-[#1A1624] text-white">
              Isolated
            </option>
          </select>
        </div>

        {/* Leverage pill */}
        <div className="flex items-center justify-center rounded bg-[#1E1A29] px-2 py-0.5 font-semibold text-white border border-white/5">
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(Math.max(1, Math.min(100, Number(e.target.value))))}
            min={1}
            max={100}
            className="w-6 bg-transparent text-right font-mono font-semibold text-white outline-none"
          />
          <span className="text-neutral-400">x</span>
        </div>

        {/* Position mode */}
        <div className="flex items-center justify-center">
          <select
            className="cursor-pointer appearance-none bg-transparent text-center font-medium text-white outline-none"
            value={positionMode}
            onChange={(e) => setPositionMode?.(e.target.value as PositionMode)}
          >
            <option value="One-way" className="bg-[#1A1624] text-white">
              One-way
            </option>
            <option value="Hedge" className="bg-[#1A1624] text-white">
              Hedge
            </option>
          </select>
        </div>
      </div>

      {/* Tab Bar (Market) */}
      <div className="flex w-full">
        <button
          type="button"
          className={cn(
            'w-full rounded-t-md py-1.5 text-center text-xs font-semibold transition-all border-b-2',
            orderType === 'Market'
              ? 'border-brand-pink bg-gradient-to-b from-brand-pink/20 to-transparent text-white'
              : 'border-transparent text-neutral-400 hover:text-white'
          )}
          onClick={() => setOrderType('Market')}
        >
          Market
        </button>
      </div>

      {/* Side Toggle: Long / Short */}
      <div className="grid grid-cols-2 gap-2">
        {/* Long Button */}
        <button
          type="button"
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg border py-2 px-1.5 transition-all',
            side === 'long'
              ? 'border-long-green/80 bg-long-green/15 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : 'border-border-default bg-bg-tertiary/40 opacity-70 hover:opacity-100'
          )}
          onClick={() => setSide('long')}
        >
          <span className="font-bold text-long-green">Long</span>
          <div className="flex flex-col items-center text-[10px] text-neutral-400">
            <span className="whitespace-nowrap">Pay Fixed APR</span>
            <div className="my-0.5 h-[1px] w-full bg-white/10" />
            <span className="whitespace-nowrap">Rcv. Float APR</span>
          </div>
        </button>

        {/* Short Button */}
        <button
          type="button"
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg border py-2 px-1.5 transition-all',
            side === 'short'
              ? 'border-short-red/80 bg-short-red/15 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
              : 'border-border-default bg-bg-tertiary/40 opacity-70 hover:opacity-100'
          )}
          onClick={() => setSide('short')}
        >
          <span className="font-bold text-short-red">Short</span>
          <div className="flex flex-col items-center text-[10px] text-neutral-400">
            <span className="whitespace-nowrap">Pay Fixed APR</span>
            <div className="my-0.5 h-[1px] w-full bg-white/10" />
            <span className="whitespace-nowrap">Rcv. Float APR</span>
          </div>
        </button>
      </div>

      {/* Available Balance */}
      <div className="flex items-center justify-between px-1 text-[11px] text-neutral-400">
        <span>Available</span>
        <span className="font-mono text-white">
          {connected && balance !== null
            ? `${formatNumber(balance, { maximumFractionDigits: 4 })} SOL`
            : `${formatNumber(market.available)} ${market.token}`}
        </span>
      </div>

      {/* Market APR Input */}
      <div>
        <input
          type="text"
          placeholder="Market APR"
          value={aprInput}
          onChange={(e) => setAprInput(e.target.value)}
          className="w-full rounded-lg border border-border-default bg-bg-tertiary/60 px-3 py-2 font-mono text-white placeholder-neutral-500 outline-none transition-colors focus:border-brand-pink"
        />
      </div>

      {/* Size Input with Token Dropdown */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-border-default bg-bg-tertiary/60 pl-3 pr-20 py-2 font-mono text-white placeholder-neutral-500 outline-none transition-colors focus:border-brand-pink"
        />
        <div className="absolute right-2 flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[11px] font-semibold text-white pointer-events-none">
          <span>{market.token}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>
      </div>

      {/* Percentage Slider */}
      <div className="flex flex-col gap-1.5 px-1 py-1">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between px-1">
          {leverageMarks.map((m) => (
            <button
              key={m}
              type="button"
              className={cn(
                'h-2 w-2 rounded-full border border-neutral-600 transition-colors',
                sliderValue >= m ? 'bg-brand-pink border-brand-pink' : 'bg-bg-tertiary'
              )}
              onClick={() => setSliderValue(m)}
              aria-label={`${m}% mark`}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!connected ? (
        <button
          type="button"
          onClick={openWalletModal}
          className="flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-center text-xs font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-pink-glow"
          style={{
            background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
          }}
        >
          <Wallet className="h-3.5 w-3.5" />
          <span>Connect Wallet to Trade</span>
        </button>
      ) : (
        <button
          type="button"
          disabled={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            setTimeout(() => {
              setIsSubmitting(false);
              setOrderSuccess(true);
              setTimeout(() => setOrderSuccess(false), 3500);
            }, 800);
          }}
          className="w-full rounded-lg py-2.5 text-center text-xs font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-pink-glow disabled:opacity-50"
          style={{
            background: orderSuccess
              ? '#10B981'
              : 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
          }}
        >
          {isSubmitting ? (
            'Submitting on Solana...'
          ) : orderSuccess ? (
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> Order Placed!
            </span>
          ) : (
            `Open ${side === 'long' ? 'Long' : 'Short'} Order`
          )}
        </button>
      )}

      {/* Footer Info Rows */}
      <div className="mt-auto flex flex-col gap-1.5 border-t border-white/5 pt-2 text-[11px]">
        <div className="flex justify-between text-neutral-400">
          <span>Liq.Price</span>
          <span className="font-mono font-medium text-brand-pink">0 %</span>
        </div>
        <div className="flex justify-between text-neutral-400">
          <span>Margin</span>
          <span className="font-mono text-white">0 {market.token}</span>
        </div>
        <div className="flex justify-between text-neutral-400">
          <span>Max</span>
          <span className="font-mono text-white">0.00 {market.token}</span>
        </div>
      </div>
    </div>
  );
}
