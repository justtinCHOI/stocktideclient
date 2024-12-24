import { OrderTypes, OrderStates, Cash } from './entity';

// Member DTOs
export interface MemberDTO {
  memberId: number;
  email: string;
  name: string;
  nickname?: string;
  password: string;
  cashList: Cash[];
  social: boolean;
  roleNames: string[];
  status: string;
}

export interface MemberModifyDTO {
  memberId: number;
  name: string;
  email: string;
  password: string;
}

// Company DTOs
export interface CompanyResponseDto {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: StockAsBiResponseDto;
  stockInfResponseDto: StockInfResponseDto;
}

export interface CompanyModifyDTO {
  companyId: number;
  code: string;
  korName: string;
}

// StockAsBi DTOs
export interface StockAsBiResponseDto {
  stockAsBiId: number;
  companyId: number;
  askp1: string;
  askp2: string;
  // ... 나머지 호가 필드들
  bidp_rsqn10: string;
}

// StockInf DTOs
export interface StockInfResponseDto {
  stockInfId: number;
  companyId: number;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
}

// StockHold DTOs
export interface StockHoldResponseDto {
  stockHoldId: number;
  memberId: number;
  companyId: number;
  companyKorName: string;
  stockCount: number;
  totalPrice: number;
  percentage: number;
  stockReturn: number;
  reserveSellStockCount: number;
}

// StockMin DTOs
export interface StockMinResponseDto {
  stockMinId: number;
  companyId: number;
  stockTradeTime: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
}

// StockOrder DTOs
export interface StockOrderResponseDto {
  stockOrderId: number;
  stockCount: number;
  memberId: number;
  companyId: number;
  OrderTypes: OrderTypes;
  OrderStates: OrderStates;
  price: number;
  modifiedAt: string;
}

// Cash DTOs
export interface CashResponseDto {
  cashId: number;
  accountNumber: string;
  money: number;
  dollar: number;
}