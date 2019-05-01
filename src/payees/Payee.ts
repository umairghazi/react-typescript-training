import { Address, HasId } from "../common-types";

export interface Payee extends HasId {
  version: number;
  payeeName: string;
  categoryId: string;
  address: Address;
  image?: string;
  motto?: string;
  active: boolean;
}
