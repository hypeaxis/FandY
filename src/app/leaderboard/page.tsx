import AppShell from '@/components/layout/AppShell';
import ComingSoon from '@/components/common/ComingSoon';

export default function LeaderboardPage() {
  return (
    <AppShell>
      <ComingSoon
        title="Leaderboard"
        icon="🏆"
        description="Compete with top traders and earn rewards on FandY."
      />
    </AppShell>
  );
}
