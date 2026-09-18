import { useState, useRef, useEffect } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import './MarketMetrics.css';

export default function MarketMetrics({ market, markets, onSelectMarket }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const countdown = useCountdown(market.nextSettlement);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="metrics-bar">
      <div className="metrics-bar__selector">
        <div
          ref={dropdownRef}
          className={`metrics-bar__market-dropdown ${dropdownOpen ? 'metrics-bar__market-dropdown--open' : ''}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="metrics-bar__market-icon">
            {market.icon?.startsWith('/') ? (
              <img src={market.icon} alt={market.id} className="metrics-bar__market-icon-img" />
            ) : (
              market.icon
            )}
          </span>
          <div className="metrics-bar__market-info">
            <div className="metrics-bar__market-name">
              {market.id}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 4L5 6.5 7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="metrics-bar__market-platform">
              {market.platform} <span className="metrics-bar__info-icon">ⓘ</span>
            </div>
          </div>

          <div className="metrics-bar__market-list">
            {markets.map(m => (
              <button
                key={m.id}
                className={`metrics-bar__market-option ${m.id === market.id ? 'metrics-bar__market-option--active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMarket(m.id);
                  setDropdownOpen(false);
                }}
              >
                <span className="metrics-bar__market-option-icon">
                  {m.icon?.startsWith('/') ? (
                    <img src={m.icon} alt={m.id} className="metrics-bar__market-option-img" />
                  ) : (
                    m.icon
                  )}
                </span>
                <div>
                  <div className="metrics-bar__market-option-name">{m.id}</div>
                  <div className="metrics-bar__market-option-platform">{m.platform}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="metrics-bar__apr-main">
          <span className="metrics-bar__apr-value metrics-bar__apr-value--positive">
            {market.marketAPR.toFixed(2)}%
          </span>
          <span className="metrics-bar__apr-label">Market APR</span>
        </div>
      </div>

      <div className="metrics-bar__divider"></div>

      <div className="metrics-bar__items">
        <div className="metrics-bar__item">
          <span className="metrics-bar__label">Mark APR</span>
          <span className="metrics-bar__value">{market.markAPR.toFixed(2)}% <span className="metrics-bar__info-icon">ⓘ</span></span>
        </div>
        <div className="metrics-bar__item">
          <span className="metrics-bar__label">Float APR</span>
          <span className="metrics-bar__value">{market.floatAPR.toFixed(2)}% <span className="metrics-bar__info-icon">ⓘ</span></span>
        </div>
        <div className="metrics-bar__item">
          <span className="metrics-bar__label">Notional OI</span>
          <span className="metrics-bar__value">{market.notionalOI.toLocaleString()} {market.token} <span className="metrics-bar__info-icon">ⓘ</span></span>
        </div>
        <div className="metrics-bar__item">
          <span className="metrics-bar__label">24h Volume</span>
          <span className="metrics-bar__value">{market.volume24h.toLocaleString()} {market.token}</span>
        </div>
        <div className="metrics-bar__item">
          <span className="metrics-bar__label">Next Settlement</span>
          <span className="metrics-bar__value metrics-bar__value--countdown">{countdown}</span>
        </div>
      </div>
    </div>
  );
}
