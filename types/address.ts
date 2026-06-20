export enum AddressType {
  HOME = "HOME",
  WORK = "WORK",
  BILLING = "BILLING",
  SHIPPING = "SHIPPING",
}

export interface Address {
  _id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state: string;
  country?: string;
  pincode: string;
  type: AddressType;
  is_default?: boolean;
}

export interface CreateAddressInput {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state: string;
  country?: string;
  pincode: string;
  type: AddressType;
  is_default?: boolean;
}

export type UpdateAddressInput = Partial<CreateAddressInput>;

export interface AddressApiResponse {
  isSuccess: boolean;
  data: Address;
}

export interface AddressListApiResponse {
  isSuccess: boolean;
  data: Address[];
}
