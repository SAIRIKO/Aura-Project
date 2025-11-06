// by spider
// pode contar mudanças :) | :(
import { Order } from "./pharmacy.js";
import { Product } from "./pharmacy.js";

type Role = "user" | "pharmacy" | "admin" | "pharmacyOwner";

interface BaseUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  address?: string;
}

interface User extends BaseUser {
  role: "user";
  orders: Order;
  pharmacy?: Pharmacy["name"];
}

interface Admin extends BaseUser {
  role: "admin";
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

export { User };
export { Pharmacy };
export { Admin };
