import { Link } from 'react-router-dom';
import './ComingSoon.css';

export function PortfolioPage() {
  return (
    <div className="coming-soon">
      <div className="coming-soon__content">
        <div className="coming-soon__brand">
          <img src="/logo/type=Logomark.png" alt="FandY" className="coming-soon__brand-logo" />
          <span className="coming-soon__brand-name">FandY</span>
        </div>
        <div className="coming-soon__icon">📊</div>
        <h1 className="coming-soon__title">Portfolio</h1>
        <p className="coming-soon__text">Coming Soon</p>
        <p className="coming-soon__sub">Track your positions, PnL, and trading history across all markets in one place.</p>
        <Link to="/" className="coming-soon__btn">← Back to Market</Link>
      </div>
    </div>
  );
}

export function LeaderboardPage() {
  return (
    <div className="coming-soon">
      <div className="coming-soon__content">
        <div className="coming-soon__brand">
          <img src="/logo/type=Logomark.png" alt="FandY" className="coming-soon__brand-logo" />
          <span className="coming-soon__brand-name">FandY</span>
        </div>
        <div className="coming-soon__icon">🏆</div>
        <h1 className="coming-soon__title">Leaderboard</h1>
        <p className="coming-soon__text">Coming Soon</p>
        <p className="coming-soon__sub">Compete with top traders and earn rewards on FandY.</p>
        <Link to="/" className="coming-soon__btn">← Back to Market</Link>
      </div>
    </div>
  );
}
