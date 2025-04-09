import { TContext, container } from "./di-container";

export class BaseAPI {
  constructor(
    context: TContext = {
      config: undefined,
    }
  ) {
    container.setContext(context);
  }
}
