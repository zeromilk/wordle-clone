import { Word } from "../model/dictionary";

export interface GetWordReq {
  "encrypt-word": string;
}

export type GetWordRes = Word;
