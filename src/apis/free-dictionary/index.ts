export * from "./hooks";
export * from "./client";

import { BaseAPI } from "../core/baseAPI";
import { TContext } from "../core/di-container";
import { EntryService } from "./service/entry";

class DictionaryAPI extends BaseAPI {
  entryService: EntryService;

  constructor(context?: TContext) {
    super(context);

    this.entryService = new EntryService();
  }

  getWord(word: string) {
    return this.entryService.getWord(word);
  }
}

export default DictionaryAPI;
