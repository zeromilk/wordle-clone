import { PropsWithChildren, useEffect } from "react";
import { useWordleGameHandler } from "../../../(hooks)";
import { useKeyboardContext } from ".";

// 게임 로직만 처리하는 컴포넌트 (UI 없음)
const KeyHandlerRegister = ({ children }: PropsWithChildren) => {
  const { addLetter, removeLetter, nextRound } = useWordleGameHandler();
  const { registerKeyHandler } = useKeyboardContext();

  // 마운트 시 한 번만 핸들러 등록
  useEffect(() => {
    // 영문자 키 등록
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((key) => {
      registerKeyHandler(key, () => addLetter(key));
    });

    // 특수 키 등록
    registerKeyHandler("Enter", nextRound);
    registerKeyHandler("Backspace", removeLetter);
  }, [addLetter, removeLetter, nextRound, registerKeyHandler]);

  // UI 없음
  return <>{children}</>;
};

export default KeyHandlerRegister;
