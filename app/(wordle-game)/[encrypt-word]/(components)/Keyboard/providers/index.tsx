import { PropsWithChildren } from "react";
import {
  KeyboardProvider as _KeyboardProvider,
  useKeyboardContext,
} from "./KeyboardProvider";
import KeyHandlerRegister from "./KeyHandlerRegister";
import KeyStateObserver from "./KeyStateObserver";

const KeyboardProvider = ({ children }: PropsWithChildren) => {
  return (
    <_KeyboardProvider>
      <KeyHandlerRegister />
      <KeyStateObserver />
      {children}
    </_KeyboardProvider>
  );
};

export { useKeyboardContext };
export default KeyboardProvider;
