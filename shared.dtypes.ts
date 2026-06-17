export interface AddressParams {
  id: string;
  user_id: string;
  region: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  country_code: string;
  created_at: string;
}

export interface Region{
  country:string,
  code:string
}

export interface CreateAddress{ 
  selectedRegion: Region | undefined; 
  address: string; 
  city: string; 
  state: string; 
  phone: string; 
}

// export interface UpdateAddress {
//   title?: string | null;
//   region?: string;
//   address?: string | null;
//   state?: string | null;
//   city?: string | null;
//   phone?: string | null;
//   country_code?: string | null;
//   flag?: string | null;
//   is_default?: boolean;
// }



export type OrderStatus =
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned"
  | "waiting"
  | "reviewed";

export interface OrderParams {
  id: string;
  user_id: string; 
  user_email: string | null;
  product_name: string;
  product_category: string | null;
  amount_paid: number;
  reference_paystack: string;
  quantity_bought: number;
  image_url: string;
  status: OrderStatus;
  size: string | null;
  color: string | null;
  region: string | null;
  state: string | null;
  city: string | null;
  address: string;
  phone: string;
  country_code: string | null;
  created_at: string;
  updated_at: string; 
}

export interface CreateOrder {
  user_id: string;
  user_email?: string | null;
  product_name: string;
  product_category?: string | null;
  amount_paid: number;
  reference_paystack: string;
  quantity_bought: number;
  image_url: string;
  status: string;
  size?: string | null;
  color?: string | null;
  region?: string | null;
  state?: string | null;
  city?: string | null;
  address: string;
  phone: string;
  country_code?: string | null;
}

// export interface UpdateOrder {
//   user_email?: string | null;
//   product_name?: string;
//   product_category?: string | null;
//   amount_paid?: number;
//   reference_paystack?: string;
//   quantity_bought?: number;
//   image_url?: string;
//   status?: OrderStatus;
//   size?: string | null;
//   color?: string | null;
//   region?: string | null;
//   state?: string | null;
//   city?: string | null;
//   address?: string;
//   phone?: string;
//   country_code?: string | null;
//   updated_at?: string;
// }