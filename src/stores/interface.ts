export type Updater<T> = Partial<T> | ((prev: T) => T);
