export interface AccountSummary {
  token: string;
  totalValue: number;
  unrealizedPNL: number;
  unrealizedPNLToken: number;
  marginRatio: number;
  maintenanceMargin: number;
  marginBalance: number;
}

export interface WalletInfo {
  address: string;
  connected: boolean;
}
