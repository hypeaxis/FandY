'use client';

import { useEffect, useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function useSolanaAccount() {
  const { connection } = useConnection();
  const {
    publicKey,
    connected,
    connecting,
    wallet,
    wallets,
    select,
    connect,
    disconnect,
  } = useWallet();

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !connected) {
      setBalance(null);
      return;
    }

    try {
      setLoading(true);
      const lamports = await connection.getBalance(publicKey, 'confirmed');
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error('Failed to fetch SOL balance:', err);
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey, connected]);

  useEffect(() => {
    fetchBalance();

    if (!publicKey) return;

    try {
      const subscriptionId = connection.onAccountChange(
        publicKey,
        (accountInfo) => {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        },
        'confirmed'
      );

      return () => {
        connection.removeAccountChangeListener(subscriptionId);
      };
    } catch {
      // Ignore websocket errors if unsupported by RPC
    }
  }, [connection, publicKey, fetchBalance]);

  const requestAirdrop = useCallback(
    async (solAmount = 1): Promise<{ success: boolean; message?: string }> => {
      if (!publicKey) return { success: false, message: 'Wallet not connected' };
      try {
        setLoading(true);
        const signature = await connection.requestAirdrop(
          publicKey,
          solAmount * LAMPORTS_PER_SOL
        );
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature,
        });
        await fetchBalance();
        return { success: true };
      } catch (err: unknown) {
        console.error('Airdrop failed:', err);
        const errMsg = err instanceof Error ? err.message : String(err);
        return {
          success: false,
          message: errMsg.includes('429')
            ? 'Faucet rate limit reached. Please try again later or visit faucet.solana.com'
            : 'Devnet airdrop request failed. Please try faucet.solana.com',
        };
      } finally {
        setLoading(false);
      }
    },
    [connection, publicKey, fetchBalance]
  );

  const shortenAddress = (chars = 4): string => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, chars)}...${base58.slice(-chars)}`;
  };

  return {
    publicKey,
    address: publicKey ? publicKey.toBase58() : null,
    shortAddress: shortenAddress(),
    connected,
    connecting,
    wallet,
    wallets,
    balance,
    loading,
    refreshBalance: fetchBalance,
    requestAirdrop,
    select,
    connect,
    disconnect,
  };
}

