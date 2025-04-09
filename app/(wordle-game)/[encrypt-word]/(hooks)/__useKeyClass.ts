import { useMemo } from "react";
import { useOriginWord } from ".";
import { useWordleGameState } from "@/stores/wordle-game";

const useKeyClass = (letter: string) => {
  const originWord = useOriginWord();
  const { boardState, currentRoundIndex } = useWordleGameState();
  const guesses = useMemo(() => {
    if (currentRoundIndex === 0) {
      return [];
    }

    return boardState.slice(0, currentRoundIndex);
  }, [currentRoundIndex]);

  // 원본 단어의 알파벳 인덱스 맵 생성
  const originalWordMap = useMemo(() => {
    const map = new Map();
    [...originWord].forEach((char, index) => {
      const existingIndices = map.get(char) || new Set();
      existingIndices.add(index);
      map.set(char, existingIndices);
    });
    return map;
  }, [originWord]);

  // 추측 단어의 알파벳 인덱스 맵 생성
  const guessesMap = useMemo(() => {
    const map = new Map();
    guesses.forEach((guess) => {
      [...guess].forEach((char, index) => {
        const existingIndices = map.get(char) || new Set();
        existingIndices.add(index);
        map.set(char, existingIndices);
      });
    });
    return map;
  }, [guesses]);

  return useMemo(() => {
    if (guesses.length === 0) {
      return "";
    }

    if (!guessesMap.has(letter)) {
      return "";
    }

    // 원본 단어에 알파벳이 없으면 'absent'
    if (!originalWordMap.has(letter)) {
      return "absent";
    }

    const originalIndices = originalWordMap.get(letter);
    const guessIndices = guessesMap.get(letter);

    // 인덱스가 일치하는지 확인
    for (const index of guessIndices) {
      if (originalIndices.has(index)) {
        return "correct"; // 하나라도 일치하는 인덱스가 있으면 'correct'
      }
    }

    // 인덱스는 일치하지 않지만 알파벳은 있으면 'present'
    return "present";
  }, [guesses, guessesMap, originalWordMap]);

  //   return "";
};

export default useKeyClass;
