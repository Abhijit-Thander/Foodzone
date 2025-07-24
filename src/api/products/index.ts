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

// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     async mutationFn(data: any) {
//       console.log("Updating product with data:", data);
//       const { error, data: updatedProduct } = await supabase
//         .from("products")
//         .update({
//           name: data.name,
//           image: data.image,
//           price: data.price,
//           description: data.description,
//           rating: data.rating,
//           isVeg: data.isVeg,
//           restaurantname: data.restaurantname,
//           deliverytime: data.deliverytime,
//           discount: data.discount,
//         })
//         .eq("id", data.id)
//         .select()
//         // .single()
//         .maybeSingle();

//       // .single();
//       if (error) {
//         throw new Error(error.message);
//       }
//       return updatedProduct;
//     },
//     async onSuccess(_, data) {
//       await queryClient.invalidateQueries({ queryKey: ["products"] });
//       await queryClient.invalidateQueries({ queryKey: ["products", data.id] });
//     },
//     onError(error) {
//       console.log("Error", error.message);
//     },
//   });
// };

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      console.log(
        "🧪 Updating product with data:",
        JSON.stringify(data, null, 2)
      );

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

      console.log(
        "✅ Supabase updated product:",
        JSON.stringify(updatedProduct, null, 2)
      );
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
