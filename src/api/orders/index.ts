import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({ archived = false }) => {
  let statues = archived ? ["delivered"] : ["new", "cooking", "delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        // .single()
        .in("status", statues)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["orders", { user_id: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrdersDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("* ,order_items(*, products(*))")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// Create a new order
export const useInsertOrders = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: Tables<"orders">) {
      const { error, data: newOrder } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Update an order status
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: Tables<"orders">;
    }) {
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select("*")
        .maybeSingle();

      if (error) {
        console.log("❌ Supabase error:", error.message);
        throw new Error(error.message);
      }
      return updatedOrder;
    },

    async onSuccess(_, data) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
    },

    onError(error) {
      console.log("❌ Mutation error:", error.message);
    },
  });
};
