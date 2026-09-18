import { useState } from 'react';
import './Modal.css';

export function DepositModal({ isOpen, onClose, market }) {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Deposit</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <div className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Token</label>
            <select className="modal__select">
              <option>SOL</option>
              <option>USDC</option>
              <option>ETH</option>
            </select>
          </div>
          <div className="modal__field">
            <label className="modal__label">Amount</label>
            <input
              type="text"
              className="modal__input"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className="modal__available">
            Available: <span>3,636.36 SOL</span>
          </div>
          <button className="modal__submit modal__submit--deposit">Confirm Deposit</button>
        </div>
      </div>
    </div>
  );
}

export function WithdrawModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Withdraw</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <div className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Token</label>
            <select className="modal__select">
              <option>SOL</option>
              <option>USDC</option>
            </select>
          </div>
          <div className="modal__field">
            <label className="modal__label">Amount</label>
            <input
              type="text"
              className="modal__input"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <button className="modal__submit">Confirm Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export function WalletConnectModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const wallets = [
    { name: 'Solflare', icon: '🟣' },
    { name: 'WalletConnect', icon: '🔵' },
    { name: 'Phantom', icon: '👻' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Connect a wallet on Solana to continue</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <div className="modal__body">
          {wallets.map(w => (
            <button key={w.name} className="modal__wallet-option" onClick={onClose}>
              <span className="modal__wallet-icon">{w.icon}</span>
              <span>{w.name}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto' }}>
                <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
