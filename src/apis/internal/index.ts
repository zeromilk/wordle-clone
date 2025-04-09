export * from "./hooks";
export * from "./client";

import { BaseAPI } from "../core/baseAPI";
import { TContext } from "../core/di-container";
import { DictionaryService } from "./service/dictionary";

class InternalAPI extends BaseAPI {
  dictionaryService: DictionaryService;

  constructor(context?: TContext) {
    super(context);

    this.dictionaryService = new DictionaryService();
  }

  getWord(encryptWord: string) {
    return this.dictionaryService.getWord(encryptWord);
  }
}

export default InternalAPI;
