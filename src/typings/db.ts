export interface User {
  id: number;
  email: string;
  nickname: string;
  password?: string;
  provider?: 'local' | 'kakao' | 'github' | 'google' | 'apple';
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: number;
  userId: number;
  accountNumber: string;
  balance: number;
  currency: 'KRW' | 'USD';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Stock {
  id: number;
  code: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  changeRate: number;
  volume: number;
  market: 'KOSPI' | 'KOSDAQ';
  updatedAt: Date;
}

export interface StockOrder {
  id: number;
  userId: number;
  stockId: number;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELED';
  createdAt: Date;
  updatedAt: Date;
}

export interface StockHolding {
  id: number;
  userId: number;
  stockId: number;
  quantity: number;
  averagePrice: number;
  currentValue: number;
  profitLoss: number;
  updatedAt: Date;
}

export interface Chat {
  id: number;
  roomId: string;
  userId: number;
  message: string;
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'STOCK' | 'GENERAL';
  stockId?: number;
  participants: number[];  // userIds
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: number;
  userId: number;
  type: 'ORDER' | 'PRICE_ALERT' | 'SYSTEM';
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface AIRecommendation {
  id: number;
  stockId: number;
  type: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reason: string;
  createdAt: Date;
}

export interface UserSettings {
  userId: number;
  language: 'ko' | 'en' | 'ja' | 'zh';
  theme: 'light' | 'dark';
  notifications: boolean;
  updatedAt: Date;
}