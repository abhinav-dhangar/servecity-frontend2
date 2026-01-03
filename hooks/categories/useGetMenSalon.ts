// src/hooks/categories/useGetCategories.ts
"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMenSalon() {
  return useQuery({
    queryKey: ["men-salon-services"],
    queryFn: async () => {
      const res = await api.get(`/services/categoryData/4`);
      return res.data.data; // return only array
    },
  });
}
