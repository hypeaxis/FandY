export type MarginMode = 'Cross' | 'Isolated';
export type PositionMode = 'One-way' | 'Hedge';
export type OrderType = 'Market' | 'Limit';
export type TradeSide = 'long' | 'short';

export interface PositionItem {
  pair: string;
  icon: string;
  platform: string;
  leverage: string;
  expiry: string;
  notionalSize: string;
  positionValue: string;
  myFixedAPR: number;
  floatAPR: number;
  markAPR: number;
  liqAPR: number;
  pnl: number;
  pnlPercent: number;
  margin: number;
  tpsl: { tp: number | null; sl: number | null };
}

export interface OpenOrderItem {
  id?: string;
  time?: string;
  market?: string;
  icon?: string;
  side?: TradeSide;
  type?: OrderType;
  price?: number;
  amount?: number;
  status?: string;
}

export interface OrderHistoryItem {
  time: string;
  market: string;
  icon: string;
  maturity: string;
  direction: string;
  type: string;
  executedSize: string;
  orderSize: string;
  impliedAPR: number;
  triggerCondition: string;
  status: { sol: number; usd: number };
}

export interface TradeHistoryItem {
  time: string;
  market: string;
  icon: string;
  maturity: string;
  direction: string;
  positionSize: string;
  tradeValue: string;
  fixedAPR: number;
  tradePnL: { sol: number; usd: number };
}

export interface SettlementHistoryItem {
  time: string;
  pair: string;
  icon: string;
  interval: string;
  direction: string;
  notionalSize: string;
  positionValue: string;
  totalPaid: string;
  yieldReceived: string;
  settlement: { sol: number; usd: number };
}
