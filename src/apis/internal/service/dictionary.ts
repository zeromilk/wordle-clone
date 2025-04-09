import { AxiosInstance } from "axios";

import { GetWordRes } from "../dto/dictionary";
import createClient from "../client";

export class DictionaryService {
  private readonly version_1 = `/v1`;
  private readonly resource = `/dictionary`;

  private client: AxiosInstance;

  constructor() {
    this.client = createClient();
  }

  async getWord(enrcyptWord: string) {
    const resp = await this.client.get<GetWordRes>(
      `${this.version_1}${this.resource}/${enrcyptWord}`
    );

    return resp.data;
  }
}
