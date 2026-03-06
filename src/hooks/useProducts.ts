import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";
import type { Tables } from "@/integrations/supabase/types";

const mapDbProduct = (row: Tables<"products">): Product => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  model: row.model,
  description: row.description,
  price: Number(row.price),
  image: row.image_url,
  gallery: row.gallery ?? [],
  category: row.category,
  colors: row.colors,
  sizes: row.sizes,
  isNew: row.is_new,
  isBestseller: row.is_bestseller,
});

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapDbProduct);
    },
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? mapDbProduct(data) : null;
    },
    enabled: !!slug,
  });
};
