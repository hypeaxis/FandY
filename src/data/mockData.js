// ═══════════════════════════════════════════════════════════
// FandY Trading App — Mock Data
// All data derived from mockup screenshots
// ═══════════════════════════════════════════════════════════

// ─── Markets ─────────────────────────────────────────────
export const markets = [
  {
    id: 'SOL-PERP',
    platform: 'Drift',
    icon: '/logo/SOLANA-Light.png',
    token: 'SOL',
    baseToken: 'SOL',
    marketAPR: 8.39,
    markAPR: 8.39,
    floatAPR: 10.95,
    notionalOI: 5304.97,
    volume24h: 34471.057,
    nextSettlement: 401,
    available: 3636.36,
  },
  {
    id: 'BTC-USD',
    platform: 'HyperLiquid',
    icon: '/logo/BTC.png',
    token: 'USDC',
    baseToken: 'BTC',
    marketAPR: 12.74,
    markAPR: 11.52,
    floatAPR: 14.28,
    notionalOI: 5304.97,
    volume24h: 371.857,
    nextSettlement: 401,
    available: 0.02,
  },
  {
    id: 'ETH-PERP',
    platform: 'Binance',
    icon: '/logo/ETH.png',
    token: 'USDC',
    baseToken: 'ETH',
    marketAPR: 6.21,
    markAPR: 5.97,
    floatAPR: 9.86,
    notionalOI: 2841.33,
    volume24h: 18923.44,
    nextSettlement: 401,
    available: 0.00,
  },
];

// ─── Orderbook ───────────────────────────────────────────
function generateOrderbookData(baseRate = 9.58) {
  const shortRates = [];
  const longRates = [];
  const now = new Date();

  const shortSizes = [61454.2, 649.5, 337.4, 85.85, 754.34, 927.13, 248.3, 9985.71, 875.63, 759.64, 9065.71, 4549.6, 75.34, 448.96, 935.71, 357.48, 9985.71, 5793.55, 18.36, 453.67, 76.13, 3346.65, 9065.71, 15.34, 4379.6, 36.0, 224.5];
  const longSizes = [854.63, 357.48, 9985.71, 5793.55, 18.36, 453.67, 76.13, 3346.65, 9065.71, 15.34, 4379.6, 36.0, 224.5, 854.63, 357.48, 9985.71, 5793.55, 18.36, 453.67, 76.13, 3346.65, 9065.71, 15.34, 4379.6, 36.0, 224.5];

  for (let i = 0; i < 27; i++) {
    const mins = Math.floor(Math.random() * 5);
    const time = new Date(now.getTime() - mins * 60000);
    shortRates.push({
      rate: +(baseRate + 0.04 - (i * 0.01) + (Math.random() * 0.02 - 0.01)).toFixed(2),
      size: shortSizes[i] || +(Math.random() * 10000).toFixed(2),
      time: `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}`,
    });
  }

  for (let i = 0; i < 27; i++) {
    const mins = Math.floor(Math.random() * 5);
    const time = new Date(now.getTime() - mins * 60000);
    longRates.push({
      rate: +(baseRate - 0.02 - (i * 0.01) + (Math.random() * 0.02 - 0.01)).toFixed(2),
      size: longSizes[i] || +(Math.random() * 10000).toFixed(2),
      time: `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}`,
    });
  }

  return { shortRates, longRates, spread: 0.1 };
}

export const orderbookData = {
  'SOL-PERP': generateOrderbookData(9.58),
  'BTC-USD': generateOrderbookData(9.90),
  'ETH-PERP': generateOrderbookData(6.45),
};

// ─── Chart Data ──────────────────────────────────────────
export function generateChartData() {
  const data = [];
  const startDate = new Date('2025-10-17T00:00:00');
  const baseRate = 9.8;

  for (let i = 0; i < 96; i++) {
    const date = new Date(startDate.getTime() + i * 3600000);
    let rate = baseRate;
    if (i < 20) rate = baseRate + Math.sin(i * 0.3) * 0.3;
    else if (i < 40) rate = baseRate - 0.2 + Math.sin(i * 0.2) * 0.2;
    else if (i < 55) rate = baseRate - 0.5 - (i - 40) * 0.04 + Math.sin(i * 0.4) * 0.15;
    else if (i < 65) rate = baseRate - 1.0 + Math.sin(i * 0.5) * 0.3;
    else if (i < 75) rate = baseRate - 0.6 - (i - 65) * 0.03;
    else rate = baseRate - 0.8 + (i - 75) * 0.01 + Math.sin(i * 0.3) * 0.1;

    rate = Math.max(8.5, Math.min(10.2, rate));

    data.push({
      date: date.toISOString(),
      dateLabel: `${date.getMonth() + 1}/${date.getDate()}`,
      rate: +rate.toFixed(2),
    });
  }
  return data;
}

export const chartData = generateChartData();

// ─── Positions ───────────────────────────────────────────
export const positionsData = [
  {
    pair: 'ETHUSDT',
    icon: '/logo/ETH.png',
    platform: 'Binance',
    leverage: '3X',
    expiry: '26 Sep 2025',
    notionalSize: '1.125 YU',
    positionValue: '0.003648 ETH',
    myFixedAPR: 5.97,
    floatAPR: 9.86,
    markAPR: 3.74,
    liqAPR: 3.14,
    pnl: -0.03562,
    pnlPercent: 0.000123,
    margin: 0.000123,
    tpsl: { tp: null, sl: null },
  },
  {
    pair: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    platform: 'Drift',
    leverage: '10X',
    expiry: '5 Dec 2025',
    notionalSize: '3648 YU',
    positionValue: '0.004951 SOL',
    myFixedAPR: 8.39,
    floatAPR: 10.95,
    markAPR: 8.39,
    liqAPR: 2.10,
    pnl: 3.80,
    pnlPercent: -760,
    margin: 184.45,
    tpsl: { tp: null, sl: null },
  },
];

// ─── Open Orders ─────────────────────────────────────────
export const openOrdersData = [];

// ─── Order History ───────────────────────────────────────
export const orderHistoryData = [
  {
    time: '19/11/2025 07:00:16',
    market: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    maturity: '14 days (5 Dec 2025)',
    direction: 'Long Rate',
    type: 'Market',
    executedSize: '3648 YU',
    orderSize: '3648 YU',
    impliedAPR: 5.63,
    triggerCondition: '-',
    status: { sol: 3.80, usd: -760 },
  },
  {
    time: '19/11/2025 07:00:16',
    market: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    maturity: '14 days (5 Dec 2025)',
    direction: 'Long Rate',
    type: 'Market',
    executedSize: '3648 YU',
    orderSize: '3648 YU',
    impliedAPR: 5.55,
    triggerCondition: '-',
    status: { sol: 3.50, usd: -7.55 },
  },
  {
    time: '18/11/2025 14:32:08',
    market: 'BTC-USD',
    icon: '/logo/BTC.png',
    maturity: '7 days (25 Nov 2025)',
    direction: 'Short Rate',
    type: 'Limit',
    executedSize: '1200 YU',
    orderSize: '1500 YU',
    impliedAPR: 12.15,
    triggerCondition: 'APR > 12%',
    status: { sol: 1.25, usd: 312.50 },
  },
];

// ─── Trade History ───────────────────────────────────────
export const tradeHistoryData = [
  {
    time: '19/11/2025 07:00:16',
    market: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    maturity: '14 days (5 Dec 2025)',
    direction: 'Close Short',
    positionSize: '3648 YU',
    tradeValue: '0.000/4951 SOL',
    fixedAPR: 5.63,
    tradePnL: { sol: 3.80, usd: -760 },
  },
  {
    time: '19/11/2025 07:00:16',
    market: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    maturity: '14 days (5 Dec 2025)',
    direction: 'Close Long',
    positionSize: '3648 YU',
    tradeValue: '0.000/4951 SOL',
    fixedAPR: 5.55,
    tradePnL: { sol: 3.50, usd: -7.55 },
  },
  {
    time: '18/11/2025 22:15:44',
    market: 'ETH-PERP',
    icon: '/logo/ETH.png',
    maturity: '30 days (18 Dec 2025)',
    direction: 'Open Long',
    positionSize: '5000 YU',
    tradeValue: '0.012/3200 ETH',
    fixedAPR: 7.82,
    tradePnL: { sol: 0, usd: 0 },
  },
];

// ─── Settlement History ──────────────────────────────────
export const settlementHistoryData = [
  {
    time: '19/11/2025 07:00:16',
    pair: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    interval: '5mn',
    direction: 'Long Rate',
    notionalSize: '3648 YU',
    positionValue: '.585 SOL',
    totalPaid: '8.53 SOL',
    yieldReceived: '12.35 SOL',
    settlement: { sol: 3.80, usd: -760 },
  },
  {
    time: '19/11/2025 07:00:16',
    pair: 'SOL-PERP',
    icon: '/logo/SOLANA-Light.png',
    interval: '5mn',
    direction: 'Long Rate',
    notionalSize: '3648 YU',
    positionValue: '.585 SOL',
    totalPaid: '8.43 SOL',
    yieldReceived: '11.95 SOL',
    settlement: { sol: 3.50, usd: -7.55 },
  },
];

// ─── Account ─────────────────────────────────────────────
export const accountData = {
  'SOL-PERP': {
    token: 'SOL',
    totalValue: 1043.45,
    unrealizedPNL: -760,
    unrealizedPNLToken: 3.36,
    marginRatio: 100,
    maintenanceMargin: 184.45,
    marginBalance: 843.65,
  },
  'BTC-USD': {
    token: 'USDC',
    totalValue: 0.00,
    unrealizedPNL: 0.00,
    unrealizedPNLToken: 0.00,
    marginRatio: 0,
    maintenanceMargin: 0.00,
    marginBalance: 0.00,
  },
  'ETH-PERP': {
    token: 'USDC',
    totalValue: 0.00,
    unrealizedPNL: 0.00,
    unrealizedPNLToken: 0.00,
    marginRatio: 0,
    maintenanceMargin: 0.00,
    marginBalance: 0.00,
  },
};

// ─── Market Traders ──────────────────────────────────────
export function generateMarketTraders() {
  const trades = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const time = new Date(now.getTime() - i * 12000);
    trades.push({
      rate: +(9.50 + Math.random() * 0.2).toFixed(2),
      size: +(Math.random() * 10000).toFixed(2),
      time: `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}`,
      side: Math.random() > 0.5 ? 'long' : 'short',
    });
  }
  return trades;
}

// ─── Wallet ──────────────────────────────────────────────
export const walletData = {
  address: '0x1ed...31bd',
  connected: true,
};
