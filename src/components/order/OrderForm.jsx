import { useState } from 'react';
import './OrderForm.css';

export default function OrderForm({
  market,
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
}) {
  const [amount, setAmount] = useState('0');
  const [aprInput, setAprInput] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const leverageMarks = [0, 25, 50, 75, 100];

  return (
    <div className="order-form">
      {/* Title */}
      <div className="order-form__title">Order</div>

      {/* Mode Row: Cross / 1x / One-way */}
      <div className="order-form__mode-row">
        <div className="order-form__mode-pill">
          <select
            className="order-form__select"
            value={marginMode}
            onChange={e => setMarginMode(e.target.value)}
          >
            <option value="Cross">Cross</option>
            <option value="Isolated">Isolated</option>
          </select>
        </div>

        <div className="order-form__mode-pill order-form__leverage-pill">
          <input
            type="number"
            value={leverage}
            onChange={e => setLeverage(Number(e.target.value))}
            min="1"
            max="100"
            className="order-form__leverage-input"
          />
          <span>x</span>
        </div>

        <div className="order-form__mode-pill">
          <select
            className="order-form__select"
            value={positionMode}
            onChange={e => setPositionMode?.(e.target.value)}
          >
            <option value="One-way">One-way</option>
            <option value="Hedge">Hedge</option>
          </select>
        </div>
      </div>

      {/* Market Tab */}
      <div className="order-form__tab-bar">
        <button
          className={`order-form__tab ${orderType === 'Market' ? 'order-form__tab--active' : ''}`}
          onClick={() => setOrderType('Market')}
        >
          Market
        </button>
      </div>

      {/* Side Toggle: Long / Short Buttons with fraction display */}
      <div className="order-form__side-toggle">
        {/* Long Button */}
        <button
          type="button"
          className={`order-form__side-btn order-form__side-btn--long ${side === 'long' ? 'order-form__side-btn--active' : ''}`}
          onClick={() => setSide('long')}
        >
          <span className="order-form__side-title">Long</span>
          <div className="order-form__side-fraction">
            <span className="order-form__fraction-top">Pay Fixed APR</span>
            <div className="order-form__fraction-divider"></div>
            <span className="order-form__fraction-bottom">Rcv. Float APR</span>
          </div>
        </button>

        {/* Short Button */}
        <button
          type="button"
          className={`order-form__side-btn order-form__side-btn--short ${side === 'short' ? 'order-form__side-btn--active' : ''}`}
          onClick={() => setSide('short')}
        >
          <span className="order-form__side-title">Short</span>
          <div className="order-form__side-fraction">
            <span className="order-form__fraction-top">Pay Fixed APR</span>
            <div className="order-form__fraction-divider"></div>
            <span className="order-form__fraction-bottom">Rcv. Float APR</span>
          </div>
        </button>
      </div>

      {/* Available Balance */}
      <div className="order-form__available-row">
        <span className="order-form__available-label">Available</span>
        <span className="order-form__available-pill"></span>
        <span className="order-form__available-token">{market.token}</span>
      </div>

      {/* Market APR Input */}
      <div className="order-form__field">
        <input
          type="text"
          placeholder="Market APR"
          value={aprInput}
          onChange={e => setAprInput(e.target.value)}
          className="order-form__input"
        />
      </div>

      {/* Size Input with Token Dropdown */}
      <div className="order-form__field order-form__field--size">
        <input
          type="text"
          placeholder="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="order-form__input"
        />
        <div className="order-form__token-select-wrap">
          <select className="order-form__token-select">
            <option>{market.token}</option>
          </select>
          <svg className="order-form__token-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Percentage Slider */}
      <div className="order-form__slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={e => setSliderValue(Number(e.target.value))}
          className="order-form__slider"
        />
        <div className="order-form__slider-ticks">
          {leverageMarks.map(m => (
            <button
              key={m}
              type="button"
              className={`order-form__slider-tick ${sliderValue >= m ? 'order-form__slider-tick--active' : ''}`}
              onClick={() => setSliderValue(m)}
            />
          ))}
        </div>
      </div>

      {/* Single Open Order Submit Button */}
      <button type="button" className="order-form__submit-btn">
        Open Order
      </button>

      {/* Footer Info Rows */}
      <div className="order-form__footer-info">
        <div className="order-form__footer-row">
          <span className="order-form__footer-label">Liq.Price</span>
          <span className="order-form__footer-value order-form__footer-value--pink">0 %</span>
        </div>
        <div className="order-form__footer-row">
          <span className="order-form__footer-label">Margin</span>
          <span className="order-form__footer-value">0 {market.token}</span>
        </div>
        <div className="order-form__footer-row">
          <span className="order-form__footer-label">Max</span>
          <span className="order-form__footer-value">0.00 {market.token}</span>
        </div>
      </div>
    </div>
  );
}
