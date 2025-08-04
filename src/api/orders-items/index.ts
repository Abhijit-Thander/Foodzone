import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrdersItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: Tables<"order_items">) {
      const { error, data: newOrderItem } = await supabase
        .from("order_items")
        .insert({ ...data })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newOrderItem;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
