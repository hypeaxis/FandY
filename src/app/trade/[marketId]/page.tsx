import AppShell from '@/components/layout/AppShell';
import MarketView from '@/components/trading/MarketView';

interface TradePageProps {
  params: {
    marketId: string;
  };
}

export default function TradePage({ params }: TradePageProps) {
  return (
    <AppShell>
      <MarketView initialMarketId={params.marketId} />
    </AppShell>
  );
}
