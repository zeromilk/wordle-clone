import { Updater } from "./interface";

export function applyUpdate<T>(currentState: T, updater: Updater<T>): T {
  return typeof updater === "function"
    ? updater(currentState)
    : { ...currentState, ...updater };
}
