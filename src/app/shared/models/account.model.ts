export interface Account {
  id: number;
  name: string;
  features?: string[];
  status: string;
  isTestAccount?: boolean;
  tier?: number | 0;
  sfId?: string;
}

export enum EntityStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}
