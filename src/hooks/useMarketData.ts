import { useState, useCallback } from 'react';
import { markets, orderbookData, accountData } from '../data/mockData';
import { Market, OrderbookData } from '../types/market';
import { AccountSummary } from '../types/account';
import { MarginMode, PositionMode, OrderType, TradeSide } from '../types/trading';

export function useMarketData(initialMarketId = 'SOL-PERP') {
  const [selectedMarketId, setSelectedMarketId] = useState<string>(initialMarketId);
  const [marginMode, setMarginMode] = useState<MarginMode>('Cross');
  const [leverage, setLeverage] = useState<number>(20);
  const [positionMode, setPositionMode] = useState<PositionMode>('One-way');
  const [orderType, setOrderType] = useState<OrderType>('Market');
  const [side, setSide] = useState<TradeSide>('long');

  const selectedMarket: Market =
    markets.find((m) => m.id === selectedMarketId) || markets[0];
  const orderbook: OrderbookData =
    orderbookData[selectedMarketId] || orderbookData['SOL-PERP'];
  const account: AccountSummary =
    accountData[selectedMarketId] || accountData['SOL-PERP'];

  const selectMarket = useCallback((id: string) => {
    setSelectedMarketId(id);
  }, []);

  return {
    markets,
    selectedMarket,
    selectedMarketId,
    selectMarket,
    orderbook,
    account,
    marginMode,
    setMarginMode,
    leverage,
    setLeverage,
    positionMode,
    setPositionMode,
    orderType,
    setOrderType,
    side,
    setSide,
  };
}

export type UseMarketDataReturn = ReturnType<typeof useMarketData>;
