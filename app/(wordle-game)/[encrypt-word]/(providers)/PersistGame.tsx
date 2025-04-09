"use client";

import { PropsWithChildren, useEffect } from "react";
import { useParams } from "next/navigation";
import WordleUtils from "@/utils/WordleUtils";
import { useWordleGameState } from "@/stores/wordle-game";
import { isEmpty } from "lodash-es";

const PersistGame = ({ children }: PropsWithChildren) => {
  const params = useParams<{ "encrypt-word": string }>();
  const { ["encrypt-word"]: encryptWord } = params;

  const { gameState, currentRoundIndex, getShouldSaveState, setState } =
    useWordleGameState();

  useEffect(() => {
    const persistedGame = WordleUtils.readSavedGame();
    if (!isEmpty(persistedGame)) {
      setState((prev) => {
        const { puzzleId, ...rest } = persistedGame;

        if (persistedGame.puzzleId === encryptWord) {
          return {
            ...prev,
            ...rest,
          };
        }

        return {
          ...prev,
          stats: { ...rest.stats },
        };
      });
    }
  }, []);

  useEffect(() => {
    if (currentRoundIndex === 0) {
      return;
    }

    const Game = getShouldSaveState();
    WordleUtils.saveGame({
      ...Game,
      puzzleId: encryptWord,
    });
  }, [gameState, currentRoundIndex]);

  return <>{children}</>;
};

export default PersistGame;
