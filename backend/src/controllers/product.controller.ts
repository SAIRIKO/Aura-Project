import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const productController = {
  // Listar produtos
  async getAll(req: Request, res: Response) {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*, pharmacy(*)"); // join simples

      if (error) {
        return res
          .status(500)
          .json({ error: "Erro ao listar produtos", details: error });
      }

      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro inesperado ao listar produtos", details: error });
    }
  },

  // Criar produto
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        category,
        activeIngredient,
        price,
        stock,
        imageUrl,
        pharmacyId,
      } = req.body;

      const { data: product, error } = await supabase
        .from("products")
        .insert([
          {
            name,
            description,
            category,
            activeIngredient,
            price,
            stock,
            imageUrl,
            pharmacyId, // FK direto
          },
        ])
        .select()
        .single();

      if (error) {
        return res
          .status(400)
          .json({ error: "Erro ao criar produto", details: error });
      }

      res.status(201).json(product);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro inesperado ao criar produto", details: error });
    }
  },

  // Atualizar produto
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const {
        name,
        description,
        category,
        price,
        stock,
        imageUrl,
        activeIngredient,
      } = req.body;

      const { data: updated, error } = await supabase
        .from("products")
        .update({
          name,
          description,
          category,
          price,
          stock,
          imageUrl,
          activeIngredient,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res
          .status(400)
          .json({ error: "Erro ao atualizar produto", details: error });
      }

      res.json(updated);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro inesperado ao atualizar produto", details: error });
    }
  },

  // Deletar produto
  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        return res
          .status(400)
          .json({ error: "Erro ao remover produto", details: error });
      }

      res.json({ message: "Produto removido com sucesso" });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro inesperado ao remover produto", details: error });
    }
  },
};
