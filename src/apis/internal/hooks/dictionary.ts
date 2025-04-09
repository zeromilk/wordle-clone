import { TUseQueryOptions } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import { Word } from "../model/dictionary";
import { QUERY_KEYS } from "./queryKeys";
import InternalAPI from "..";

export const useGetWord = (
  encryptWord: string,
  queryOptions?: TUseQueryOptions<Word>
) => {
  return useQuery<Word>({
    queryKey: QUERY_KEYS.GET_WORD(encryptWord),
    queryFn: async () => {
      const res = await new InternalAPI().getWord(encryptWord);

      return res;
    },
    ...queryOptions,
  });
};
