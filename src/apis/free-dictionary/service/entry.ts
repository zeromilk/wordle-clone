import { AxiosInstance } from "axios";
import createClient from "../client";
import { GetWordRes } from "../dto/entry";

export class EntryService {
  private readonly version_1 = `/v2`;
  private readonly resource = `/entries/en`;

  private client: AxiosInstance;

  constructor() {
    this.client = createClient();
  }

  async getWord(word: string) {
    const resp = await this.client.get<GetWordRes>(
      `${this.version_1}${this.resource}/${word}`
    );

    return resp.data[0];
  }
}
