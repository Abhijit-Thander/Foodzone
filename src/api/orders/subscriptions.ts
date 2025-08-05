import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// This hook sets up a subscription to listen for new orders being inserted into the database.
export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();

    // ✅ Cleanup on unmount
    return () => {
      supabase.removeChannel(orders);
    };
  }, []);
};

// This hook sets up a subscription to listen for updates to a specific order's status.
export const useUpdateOrderStatusSubscription = (id: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders", id] });
        }
      )
      .subscribe();

    // ✅ Cleanup on unmount
    return () => {
      supabase.removeChannel(orders);
    };
  }, []);
};
