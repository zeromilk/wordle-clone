import { create } from "zustand";

type KeyState = "" | "absent" | "present" | "correct";

interface KeyboardState {
  keyStates: Record<string, KeyState>;
  setKeyState: (key: string, state: KeyState) => void;
  updateKeyStates: (guesses: string[], originWord: string) => void;
}

export const useKeyboardStore = create<KeyboardState>((set) => ({
  keyStates: {},

  setKeyState: (key, state) =>
    set((prevState) => ({
      keyStates: {
        ...prevState.keyStates,
        [key]: state,
      },
    })),

  updateKeyStates: (guesses, originWord) =>
    set(() => {
      const newKeyStates: Record<string, KeyState> = {};

      // 각 추측 단어와 글자를 처리
      guesses.forEach((guess) => {
        [...guess].forEach((letter, i) => {
          // 이미 correct인 경우 변경하지 않음
          if (newKeyStates[letter] === "correct") return;

          if (originWord[i] === letter) {
            // 정확한 위치에 있는 경우
            newKeyStates[letter] = "correct";
          } else if (originWord.includes(letter)) {
            // 포함되지만 다른 위치에 있는 경우
            newKeyStates[letter] = "present";
          } else {
            // 포함되지 않는 경우
            newKeyStates[letter] = "absent";
          }
        });
      });

      return { keyStates: newKeyStates };
    }),
}));
