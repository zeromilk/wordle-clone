import useBeforeUnload from "@/hooks/useBeforeUnload";
import useEffectOnce from "@/hooks/useEffectOnce";
import { useGameTimeStamp, useWordleGameState } from "@/stores/wordle-game";
import WordleUtils from "@/utils/WordleUtils";
import { dayjs } from "@/utils/date";

import { isEmpty } from "lodash-es";
import { PropsWithChildren, useRef, useEffect } from "react";

const PersistPlaytime = ({ children }: PropsWithChildren) => {
  const { setTimestamp } = useGameTimeStamp();
  const { gameState } = useWordleGameState();
  const timestampRef = useRef(0);
  const gameStateRef = useRef(gameState);

  // 시간 지속 데이터를 저장하는 함수
  const saveDurationData = () => {
    if (gameStateRef.current === "in_progress") {
      const persistedGame = WordleUtils.readSavedGame();
      if (!isEmpty(persistedGame)) {
        WordleUtils.saveGame({
          ...persistedGame,
          duration:
            persistedGame.duration + dayjs().unix() - timestampRef.current,
        });
      }
    }
  };

  // 브라우저 종료 시 데이터 저장
  useBeforeUnload(saveDurationData, []);
  // 언마운트 시 데이터 저장
  useEffectOnce(() => {
    timestampRef.current = dayjs().unix();
    setTimestamp(timestampRef.current);

    return () => {
      saveDurationData();
    };
  });

  // 게임상태 최신화
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  return <>{children}</>;
};

export default PersistPlaytime;
