export interface ColumnConfig {
  field: string;
  label?: string;
  sortIndicator?: string;
}

export interface HasId {
  id: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
