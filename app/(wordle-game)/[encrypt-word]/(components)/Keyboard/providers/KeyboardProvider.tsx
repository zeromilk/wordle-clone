// KeyboardContext.tsx
import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  PropsWithChildren,
} from "react";

type KeyHandler = () => void;

interface KeyboardContextType {
  handleKeyPress: (key: string) => void;
  registerKeyHandler: (key: string, handler: KeyHandler) => void;
}

interface HandlersRef {
  keyHandlers: Record<string, KeyHandler>;
  registerKeyHandler: (key: string, handler: KeyHandler) => void;
}

const KeyboardContext = createContext<KeyboardContextType | null>(null);

interface KeyboardProviderProps extends PropsWithChildren {}

export const KeyboardProvider = ({ children }: KeyboardProviderProps) => {
  // 함수 레퍼런스 유지를 위해 ref 사용
  const handlersRef = useRef<HandlersRef>({
    keyHandlers: {},
    registerKeyHandler: (key, handler) => {
      handlersRef.current.keyHandlers[key] = handler;
    },
  });

  // 키 이벤트 처리 함수 (모든 키가 공유)
  const handleKeyPress = useCallback((key: string) => {
    const handler = handlersRef.current.keyHandlers[key];
    if (handler) {
      handler();
    }
  }, []);

  return (
    <KeyboardContext.Provider
      value={{
        handleKeyPress,
        registerKeyHandler: handlersRef.current.registerKeyHandler,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboardContext = (): KeyboardContextType => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error(
      "useKeyboardContext must be used within a KeyboardProvider"
    );
  }

  return context;
};
