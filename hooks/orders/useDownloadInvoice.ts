import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useDownloadInvoice() {
  return useMutation({
    mutationFn: async (orderId: number) => {
      const { data } = await api.get(`/orders/${orderId}/invoice`);
      return data;
    },
  });
}
