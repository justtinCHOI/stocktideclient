export interface AccountState {
  cashId: number;
  accountNumber: string;
  money: number;
  dollar: number;
}

export interface ChargeProps {
  cashId: number;
}

export interface ExchangeProps {
  cashId: number;
}

export interface AccountComponentProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}


