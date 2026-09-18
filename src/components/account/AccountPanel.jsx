import { useState } from 'react';
import './AccountPanel.css';

export default function AccountPanel({ account, onDeposit, onWithdraw }) {
  const [activeAction, setActiveAction] = useState('deposit');

  const handleAction = (action) => {
    setActiveAction(action);
    if (action === 'deposit' && onDeposit) {
      onDeposit();
    }
    if (action === 'withdraw' && onWithdraw) {
      onWithdraw();
    }
  };

  return (
    <div className="account-panel">
      <div className="account-panel__header">
        <h3 className="account-panel__title">Account</h3>
        <div className="account-panel__actions">
          <button
            className={`account-panel__btn ${activeAction === 'deposit' ? 'account-panel__btn--active' : ''}`}
            onClick={() => handleAction('deposit')}
          >
            Deposit
          </button>
          <button
            className={`account-panel__btn ${activeAction === 'withdraw' ? 'account-panel__btn--active' : ''}`}
            onClick={() => handleAction('withdraw')}
          >
            Withdraw
          </button>
          <button
            className={`account-panel__btn ${activeAction === 'transfer' ? 'account-panel__btn--active' : ''}`}
            onClick={() => handleAction('transfer')}
          >
            Transfer
          </button>
        </div>
      </div>

      <div className="account-panel__section">
        <div className="account-panel__section-title">Account Equity</div>
        <div className="account-panel__row">
          <span>Total Value</span>
          <span className="account-panel__value">{account.totalValue.toLocaleString()} {account.token}</span>
        </div>
        <div className="account-panel__row">
          <span>Unrealized PNL</span>
          <span className={`account-panel__value ${account.unrealizedPNL >= 0 ? 'account-panel__value--positive' : 'account-panel__value--negative'}`}>
            {account.unrealizedPNL >= 0 ? '+' : '-'}${Math.abs(account.unrealizedPNL).toLocaleString()}
          </span>
        </div>
        {account.unrealizedPNLToken !== 0 && (
          <div className="account-panel__row">
            <span></span>
            <span className="account-panel__value account-panel__value--sub">{account.unrealizedPNLToken} {account.token}</span>
          </div>
        )}
      </div>

      <div className="account-panel__section">
        <div className="account-panel__section-title">Margin</div>
        <div className="account-panel__row">
          <span>Margin Ratio</span>
          <div className="account-panel__margin-gauge">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="var(--border-default)" strokeWidth="3"/>
              <circle
                cx="16" cy="16" r="13" fill="none"
                stroke={account.marginRatio > 50 ? 'var(--long-green)' : account.marginRatio > 20 ? '#EAB308' : 'var(--short-red)'}
                strokeWidth="3"
                strokeDasharray={`${(account.marginRatio / 100) * 81.68} 81.68`}
                strokeLinecap="round"
                transform="rotate(-90 16 16)"
              />
            </svg>
            <span className="account-panel__margin-pct">{account.marginRatio.toFixed(0)}%</span>
          </div>
        </div>
        <div className="account-panel__row">
          <span>Maintenance Margin</span>
          <span className="account-panel__value">{account.maintenanceMargin.toLocaleString()} {account.token}</span>
        </div>
        <div className="account-panel__row">
          <span>Margin Balance</span>
          <span className="account-panel__value">{account.marginBalance.toLocaleString()} {account.token}</span>
        </div>
      </div>
    </div>
  );
}
