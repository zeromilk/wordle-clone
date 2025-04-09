import { AxiosInstanceConfig } from "./axios.config";
export type TContext = {
  config?: AxiosInstanceConfig | undefined;
};

class DIContainer {
  private static instance: DIContainer;
  private context: TContext = {
    config: undefined,
  };

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }

    return DIContainer.instance;
  }

  setContext(context: TContext): void {
    this.context = context;
  }

  getContext(): TContext {
    return this.context;
  }
}

export const container = DIContainer.getInstance();
