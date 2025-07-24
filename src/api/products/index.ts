import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image || null,
          price: data.price,
          description: data.description,
          rating: data.rating || 0,
          isVeg: data.isVeg,
          restaurantname: data.restaurantname,
          deliverytime: data.deliverytime || 0,
          discount: data.discount,
        })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image ?? null,
          price: data.price,
          description: data.description,
          rating: data.rating,
          isVeg: data.isVeg,
          restaurantname: data.restaurantname,
          deliverytime: data.deliverytime,
          discount: data.discount,
        })
        .eq("id", data.id)
        .select("*")
        .maybeSingle();

      if (error) {
        console.log("❌ Supabase error:", error.message);
        throw new Error(error.message);
      }
      return updatedProduct;
    },

    async onSuccess(_, data) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["products", data.id] });
    },

    onError(error) {
      console.log("❌ Mutation error:", error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (Id: number) => {
      const { error } = await supabase.from("products").delete().eq("id", Id);

      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Delete error:", error.message);
    },
  });
};
