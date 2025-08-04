import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrdersItems = () => {
  return useMutation({
    async mutationFn(items: Tables<"order_items">[]) {
      const { error, data: newOrderItem } = await supabase
        .from("order_items")
        .insert(items)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return newOrderItem;
    },
  });
};
