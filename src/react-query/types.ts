import {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";

export type TUseQueryOptions<T = unknown> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export type TUseInfiniteQueryOptions<T = unknown> = Partial<
  Omit<UseInfiniteQueryOptions<T, Error, InfiniteData<T>, T, QueryKey>, "queryKey" | "queryFn">
>;

export type TUseMutataionOptions<T = unknown, V = unknown, E = unknown> = Omit<
  UseMutationOptions<T, E, V>,
  "mutationFn" | "mutationKey"
>;
