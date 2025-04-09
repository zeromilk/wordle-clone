import { useWordleGameState } from "@/stores/wordle-game";
import styled from "@emotion/styled";
import clsx from "clsx";
import SubTitle from "./components/SubTitle";

const GuessDistribution = () => {
  const { stats } = useWordleGameState();
  const topGuess = stats.guesses.reduce((top, curr) => Math.max(top, curr), 0);

  return (
    <Styles.Container>
      {/* <h2>guess distribution</h2> */}
      <SubTitle text={"guess distribution"} />
      <Styles.GraphBox>
        {stats.guesses.map((guess, index) => {
          const rate = Math.floor((guess / topGuess) * 100);

          return (
            <Styles.GraphContainer key={index}>
              <div className="guess">{index + 1}</div>
              <div className="graph">
                <div
                  className={clsx("graph__bar", {
                    highlight: stats.gamePlayed > 0 && topGuess === guess,
                    alignRight: rate > 7,
                  })}
                  style={{
                    width: `${rate > 7 ? rate : 7}%`,
                  }}
                >
                  <div className="graph__guessNum">{guess}</div>
                </div>
              </div>
            </Styles.GraphContainer>
          );
        })}
      </Styles.GraphBox>
    </Styles.Container>
  );
};

export default GuessDistribution;

const Styles = {
  Container: styled.div`
    width: 100%;
  `,
  GraphBox: styled.div`
    margin-left: 20px;
    width: 50%;
  `,
  GraphContainer: styled.div`
    width: 100%;
    height: 18px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-bottom: 4px;

    .guess {
      font-weight: bold;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0.1em;
    }

    .graph {
      width: 100%;
      height: 100%;
      padding-left: 4px;
    }

    .graph__bar {
      width: 7%;
      height: 100%;
      position: relative;
      background-color: #787c7e;
      display: flex;
      justify-content: center;

      &.highlight {
        background-color: #58a351;
      }

      &.alignRight {
        justify-content: flex-end;
        padding-right: 8px;
      }

      .graph__guessNum {
        font-weight: bold;
        color: white;
        font-size: 12px;
        line-height: 15px;
      }
    }
  `,
};
