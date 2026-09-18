import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onDeposit, onConnect }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo" aria-label="FandY Home">
          <img
            src="/logo/type=Logomark.png"
            alt="FandY"
            className="navbar__logo-img"
          />
          <span className="navbar__logo-text">FandY</span>
        </Link>
      </div>

      <div className={`navbar__center ${mobileOpen ? 'navbar__center--open' : ''}`}>
        <div className="navbar__links">
          <Link to="/" className="navbar__link navbar__link--pill-markets">
            Markets <span className="navbar__link-icon-circle">⭕</span>
          </Link>
          <Link to="/" className="navbar__link navbar__link--pill-pools">
            Pools <span className="navbar__link-icon-fire">🏛️</span>
          </Link>
          <Link to="/portfolio" className="navbar__link">Portfolio</Link>
          <Link to="/leaderboard" className="navbar__link">Leaderboard</Link>
          <a href="https://sumptuous-carp-caa.notion.site/FandY-short-docs-2d4930c1ef0380ae8043cfded6c5e84d" target="_blank" rel="noopener noreferrer" className="navbar__link">Docs</a>
        </div>
      </div>

      <div className="navbar__right">
        <button className="navbar__deposit-btn" onClick={onDeposit}>
          Deposit
        </button>
        <button className="navbar__wallet-btn" onClick={onConnect}>
          0x1ed...31bd
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
