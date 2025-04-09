import { useWordleGameState } from "@/stores/wordle-game";
import styled from "@emotion/styled";
import { memo } from "react";
import SubTitle from "./components/SubTitle";

const StatisticContainer = memo(
  ({ value, label }: { value: number; label: string }) => {
    return (
      <Styles.StatisticContainer>
        <div className="value">{value}</div>
        <div className="label">{label}</div>
      </Styles.StatisticContainer>
    );
  }
);

const Statistics = () => {
  const { stats } = useWordleGameState();
  const winRate = Math.floor((stats["gameWon"] / stats["gamePlayed"]) * 100);

  return (
    <Styles.Container>
      <SubTitle text={"statistics"} />
      <Styles.Statistic>
        <StatisticContainer value={stats["gamePlayed"]} label="Played" />
        <StatisticContainer
          value={isNaN(winRate) ? 0 : winRate}
          label="Win %"
        />
        <StatisticContainer
          value={stats["currentStreak"]}
          label="Current Streak"
        />
        <StatisticContainer value={stats["maxStreak"]} label="Max Streak" />
      </Styles.Statistic>
    </Styles.Container>
  );
};

export default Statistics;

const Styles = {
  Container: styled.div``,
  Statistic: styled.ul`
    display: flex;
    width: 100%;
    gap: 12px;
    align-self: center;
    margin-bottom: 20px;
  `,
  StatisticContainer: styled.li`
    flex: 1;

    .value {
      font-size: 44px;
      font-weight: 500;

      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      letter-spacing: 0.05em;
      font-variant-numeric: proportional-nums;
      line-height: 34px;
    }

    .label {
      margin-top: 4px;
      font-size: 14px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 16px;
      letter-spacing: 0.1em;
    }
  `,
};
