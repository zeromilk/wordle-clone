// GameStateUpdater.tsx - 게임 상태 변경을 키보드 상태로 전파하는 컴포넌트
import { useEffect } from "react";
import { useWordleGameState } from "@/stores/wordle-game";
import { useOriginWord } from "../../../(hooks)";
import { useKeyboardStore } from "@/stores/keyboard";

// UI 없이 상태 동기화만 담당하는 컴포넌트
const KeyStateObserver = () => {
  const { boardState, currentRoundIndex } = useWordleGameState();
  const updateKeyStates = useKeyboardStore((state) => state.updateKeyStates);
  const originWord = useOriginWord();

  // 게임 상태가 변경될 때마다 키보드 상태 업데이트
  useEffect(() => {
    if (currentRoundIndex === 0) return;

    const guesses = boardState.slice(0, currentRoundIndex);
    updateKeyStates(guesses, originWord);
  }, [boardState, currentRoundIndex, originWord, updateKeyStates]);

  return null;
};

export default KeyStateObserver;
