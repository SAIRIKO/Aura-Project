import { supabase } from "../lib/supabase";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";

const PRODUCTS_TABLE = "products";

export async function listProducts(): Promise<any[]> {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createProduct(payload: CreateProductInput) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, payload: UpdateProductInput) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
