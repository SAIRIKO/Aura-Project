import { supabase } from "../lib/supabase";

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

  if (error) {
    if (error.code === "PGRST116" || error.code === "406") return null;
    if (error.message?.includes("Row not found")) return null;

    throw error;
  }

  return data;
}

export async function createProduct(payload: any) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, payload: any) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116" || error.code === "406") return null;
    if (error.message?.includes("Row not found")) return null;

    throw error;
  }

  return data;
}

export async function deleteProduct(id: string) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116" || error.code === "406") return null;
    if (error.message?.includes("Row not found")) return null;

    throw error;
  }

  return data;
}
