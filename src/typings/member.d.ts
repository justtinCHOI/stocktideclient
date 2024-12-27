export interface LoginState {
  email: string;
  password: string;
}

export interface LoginParam {
  email: string;
  password: string;
}

// MemberInfoComponent.tsx
export interface MemberState {
  memberId: number;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
