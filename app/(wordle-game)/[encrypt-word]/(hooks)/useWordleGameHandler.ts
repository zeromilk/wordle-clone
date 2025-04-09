import { useCallback } from "react";
import { useGetWord } from "@/apis/internal";
import { MAX_GAME_ROUND, WORD_LEN } from "@/constants/wordle-game";
import { useGameTimeStamp, useWordleGameState } from "@/stores/wordle-game";
import WordleUtils from "@/utils/WordleUtils";
import { useOriginWord } from ".";
import { useWordleGameResultModalStore } from "@/stores/modal";
import { dayjs } from "@/utils/date";
import { showToast } from "@/ui/feedback/Toast";

const useWordleGameHandler = () => {
  const {
    gameState,
    boardState,
    currentRoundIndex,
    setBoardState,
    setCurrentRoundIndex,
    setGameState,
    setValidState,
    setState,
  } = useWordleGameState();
  const originWord = useOriginWord();

  const addLetter = useCallback(
    (letter: string) => {
      if (!(gameState === "idle" || gameState === "in_progress")) {
        return;
      }

      const copied = [...boardState];
      let word = copied[currentRoundIndex];

      if (word.length < WORD_LEN) {
        word = word.concat(letter);
      }
      copied[currentRoundIndex] = word;

      setBoardState(copied);
    },
    [boardState, gameState, currentRoundIndex, setBoardState]
  );

  const removeLetter = useCallback(() => {
    if (!(gameState === "idle" || gameState === "in_progress")) {
      return;
    }

    const copied = [...boardState];
    let word = copied[currentRoundIndex];

    if (word.length > 0) {
      word = word.slice(0, word.length - 1);
    }
    copied[currentRoundIndex] = word;

    setBoardState(copied);
  }, [boardState, gameState, currentRoundIndex, setBoardState]);

  const word = boardState[currentRoundIndex];
  const { refetch } = useGetWord(WordleUtils.encrypt(word), {
    enabled: false,
  });

  const { timestamp } = useGameTimeStamp();
  const { setIsOpen } = useWordleGameResultModalStore();
  const nextRound = useCallback(() => {
    if (!(gameState === "idle" || gameState === "in_progress")) {
      return;
    }

    if (word.length < WORD_LEN) {
      showToast("Not enough letters");
      return;
    }

    refetch()
      .then((data) => {
        if (data.status === "success") {
          if (originWord === word) {
            showToast("Magnificent", "info", {
              onClose: () => {
                setIsOpen(true);
              },
            });
            setState((prev) => {
              const newGuesses = [...prev.stats.guesses];
              newGuesses[currentRoundIndex] += 1;

              const newStats = { ...prev.stats };
              newStats.gamePlayed += 1;
              newStats.gameWon += 1;
              newStats.maxStreak = Math.max(
                newStats.maxStreak,
                newStats.currentStreak + 1
              );
              newStats.currentStreak += 1;
              newStats.guesses = newGuesses;

              return {
                ...prev,
                gameState: "success",
                duration: prev.duration + dayjs().unix() - timestamp,
                stats: {
                  ...prev.stats,
                  ...newStats,
                },
              };
            });
          } else if (currentRoundIndex + 1 === MAX_GAME_ROUND) {
            showToast(originWord, "info", {
              onClose: () => {
                setIsOpen(true);
              },
            });
            setState((prev) => {
              const newGuesses = [...prev.stats.guesses];
              newGuesses[currentRoundIndex] += 1;

              return {
                ...prev,
                gameState: "fail",
                duration: prev.duration + dayjs().unix() - timestamp,
                stats: {
                  ...prev.stats,
                  gamePlayed: prev.stats.gamePlayed + 1,
                  currentStreak: 0,
                },
              };
            });
          } else {
            setGameState("in_progress");
          }

          setCurrentRoundIndex(currentRoundIndex + 1);
          setValidState("valid");
        }

        if (data.status === "error") {
          throw data.error;
        }
      })
      .catch((e) => {
        showToast("Not in word list");
        setValidState("invalid");
      });
  }, [
    boardState,
    gameState,
    currentRoundIndex,
    setCurrentRoundIndex,
    timestamp,
  ]);

  return {
    addLetter,
    removeLetter,
    nextRound,
  };
};
export default useWordleGameHandler;
