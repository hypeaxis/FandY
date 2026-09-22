import AppShell from '@/components/layout/AppShell';
import MarketView from '@/components/trading/MarketView';

export default function HomePage() {
  return (
    <AppShell>
      <MarketView initialMarketId="SOL-PERP" />
    </AppShell>
  );
}
