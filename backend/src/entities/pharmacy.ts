// by spider
// pode contar mudanças :) | :(

import { Pharmacy } from "./users-models.js";
import { Consumer } from "./users-models.js";

type OrderStatus =
  | "canceled"
  | "confirmed"
  | "delivered"
  | "pending"
  | "shipped";
type PaymentStatus = "completed" | "pending" | "failed";

interface Product {
  id: number;
  name: string;
  category: string;
  activeIngredient: string;
  price: number;
  stock: number;
  pharmacy: Pharmacy["name"];
  pharmacyId: Pharmacy["id"];
  orderItems: OrderItem;
  createdAt: Date;
  description?: string;
}

interface Payment {
  id: number;
  order: Order;
  orderId: Order["id"];
  method: string;
  status: PaymentStatus;
  transactionId: string;
  createdAt: Date;
}

interface Order {
  id: number;
  user: Consumer["name"];
  userId: Consumer["id"];
  pharmacy: Pharmacy["name"];
  pharmacyId: Pharmacy["id"];
  status: OrderStatus;
  createdAt: Date;
  items: OrderItem;
  payment: Payment;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  orderId: Order["id"];
  product: Product["name"];
  productId: Product["id"];
}

// Exportações :0
export { Order };
export { Product };
