// by spider
// pode contar mudanças :) | :(
import { Order } from "./pharmacy.js";
import { Product } from "./pharmacy.js";

type Role = "CONSUMER" | "PHARMACY" | "ADMIN" | "pharmacyOwner";
type Gender = "male" | "female" | "other" | "not_informed";

interface BaseUser {
  id: number;
  name: string;
  email: string;
  password: string;
  CPF: number;
  birth: Date;
  gender: Gender;
  phone: number;
  role: Role;
  address?: string;
}

interface Consumer extends BaseUser {
  role: "CONSUMER";
  orders: Order;
  pharmacy?: Pharmacy["name"];
}

interface Admin extends BaseUser {
  role: "ADMIN";
}

interface PharmacyOwner extends BaseUser {
  role: "pharmacyOwner";
}

interface Pharmacy extends BaseUser {
  phone: number;
  cpnj: number;
  approved: boolean; // Admin que decide
  createdAt: Date;
  orders: Order;
  products: Product;
  owner: PharmacyOwner["name"];
  ownerId: PharmacyOwner["id"];
}

// Exportações :0

export { Consumer };
export { Pharmacy };
export { Admin };
