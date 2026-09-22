export interface Market {
  id: string;
  platform: string;
  icon: string;
  token: string;
  baseToken: string;
  marketAPR: number;
  markAPR: number;
  floatAPR: number;
  notionalOI: number;
  volume24h: number;
  nextSettlement: number;
  available: number;
}

export interface FundingRatePoint {
  date: string;
  dateLabel: string;
  rate: number;
}

export interface OrderbookEntry {
  rate: number;
  size: number;
  time?: string;
}

export interface OrderbookData {
  shortRates: OrderbookEntry[];
  longRates: OrderbookEntry[];
  spread: number;
}

export interface MarketTraderItem {
  rate: number;
  size: number;
  time: string;
  side: 'long' | 'short';
}
