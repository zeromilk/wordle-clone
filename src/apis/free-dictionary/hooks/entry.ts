import { TUseQueryOptions } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import { Word } from "../model";
import { QUERY_KEYS } from ".";
import DictionaryAPI from "..";

export const useGetWord = (
  word: string,
  queryOptions?: TUseQueryOptions<Word>
) => {
  return useQuery<Word>({
    queryKey: QUERY_KEYS.GET_WORD(word),
    queryFn: async () => {
      const res = await new DictionaryAPI().getWord(word);

      return res;
    },
    ...queryOptions,
  });
};
