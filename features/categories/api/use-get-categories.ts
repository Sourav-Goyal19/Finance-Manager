"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategories = (email: string) => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await client.api[":email"].categories.$get({
        param: {
          email,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
