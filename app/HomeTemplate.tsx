"use client";

import { useWordleGameState } from "@/stores/wordle-game";
import CenterContentTemplate from "@/templates/CenterContentTemplate";
import Button from "@/ui/inputs/Button/Button";
import WordleUtils from "@/utils/WordleUtils";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const HomeTemplate = () => {
  const { reset } = useWordleGameState();

  const router = useRouter();
  const routeGame = (type: "tutorial" | "play") => {
    /**
     * 브라우저히스토리 변경 시에는 이전 게임상태를 유지하고
     * 새 게임 시작시에는 이전 게임상태를 리셋함.
     */
    reset();

    router.push(
      type === "tutorial"
        ? WordleUtils.getTutorialWord()
        : WordleUtils.getRandomWord()
    );
  };

  return (
    <Styles.Container>
      <CenterContentTemplate>
        <Styles.Wrapper>
          <Button onClick={() => routeGame("tutorial")}>Start Tutorial</Button>
          <Button onClick={() => routeGame("play")}>Play Game</Button>
        </Styles.Wrapper>
      </CenterContentTemplate>
    </Styles.Container>
  );
};

const Styles = {
  Container: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px 42px 0;
  `,
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  `,
};

export default HomeTemplate;
