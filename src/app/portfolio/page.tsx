import AppShell from '@/components/layout/AppShell';
import ComingSoon from '@/components/common/ComingSoon';

export default function PortfolioPage() {
  return (
    <AppShell>
      <ComingSoon
        title="Portfolio"
        icon="📊"
        description="Track your positions, PnL, and trading history across all markets in one place."
      />
    </AppShell>
  );
}
