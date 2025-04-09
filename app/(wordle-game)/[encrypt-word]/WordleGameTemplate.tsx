"use client";

import CenterContentTemplate from "@/templates/CenterContentTemplate";

//
import PersistGame from "./(providers)/PersistGame";
import { Board } from "./(components)/Board";
import { Keyboard } from "./(components)/Keyboard";
import PersistPlaytime from "./(providers)/PersistPlaytime";

const WordleGameTemplate = () => {
  return (
    <PersistPlaytime>
      <PersistGame>
        <CenterContentTemplate>
          <Board />
          <Keyboard />
        </CenterContentTemplate>
      </PersistGame>
    </PersistPlaytime>
  );
};

export default WordleGameTemplate;
