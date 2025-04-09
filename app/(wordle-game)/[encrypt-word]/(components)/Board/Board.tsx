"use client";

import styled from "@emotion/styled";
import BoardRow from "./BoardRow";
import { MAX_GAME_ROUND } from "@/constants/wordle-game";

const Board = () => {
  return (
    <Styles.Container>
      <Styles.Wrapper>
        {new Array(MAX_GAME_ROUND).fill("").map((_, index) => {
          return <BoardRow key={index} roundIndex={index} />;
        })}
      </Styles.Wrapper>
    </Styles.Container>
  );
};

const Styles = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  `,
  Wrapper: styled.div`
    width: 300px;
    height: 360px;
    display: grid;
    grid-template-rows: repeat(${MAX_GAME_ROUND}, 1fr);
    grid-gap: 5px;
    padding: 10px;
    box-sizing: border-box;
  `,
};

export default Board;
