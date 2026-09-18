import { useState, useCallback } from 'react';
import { markets, orderbookData, accountData } from '../data/mockData';

export function useMarketData() {
  const [selectedMarketId, setSelectedMarketId] = useState('SOL-PERP');
  const [marginMode, setMarginMode] = useState('Cross');
  const [leverage, setLeverage] = useState(20);
  const [positionMode, setPositionMode] = useState('One-way');
  const [orderType, setOrderType] = useState('Market');
  const [side, setSide] = useState('long');

  const selectedMarket = markets.find(m => m.id === selectedMarketId) || markets[0];
  const orderbook = orderbookData[selectedMarketId] || orderbookData['SOL-PERP'];
  const account = accountData[selectedMarketId] || accountData['SOL-PERP'];

  const selectMarket = useCallback((id) => {
    setSelectedMarketId(id);
  }, []);

  return {
    markets,
    selectedMarket,
    selectedMarketId,
    selectMarket,
    orderbook,
    account,
    marginMode, setMarginMode,
    leverage, setLeverage,
    positionMode, setPositionMode,
    orderType, setOrderType,
    side, setSide,
  };
}
