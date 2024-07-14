export interface User {
  username: string;
  email: string;
  phoneNumber: string;
  saldo: number;
  token: string;
  saldoHistory: SaldoHistory[];
  createdAt: Date;
  updatedAt: Date;
  authentication: {
    password: string;
    sessionToken: string;
  };
}
