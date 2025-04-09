import { useWordleGameState } from "@/stores/wordle-game";
import styled from "@emotion/styled";
import { dayjs } from "@/utils/date";
import SubTitle from "./components/SubTitle";

const PlayTime = () => {
  const { duration } = useWordleGameState();

  const durationObj = dayjs.duration(duration, "seconds");

  return (
    <Styles.Container>
      <SubTitle text={"play time"} />
      <Styles.Time>
        <Styles.TimeContainer>{durationObj.days()} 일 </Styles.TimeContainer>
        <Styles.TimeContainer>{durationObj.hours()} 시</Styles.TimeContainer>
        <Styles.TimeContainer>{durationObj.minutes()} 분</Styles.TimeContainer>
        <Styles.TimeContainer>{durationObj.seconds()} 초</Styles.TimeContainer>
      </Styles.Time>
    </Styles.Container>
  );
};

export default PlayTime;

const Styles = {
  Container: styled.div``,
  Time: styled.ul`
    display: flex;
    width: 100%;
    gap: 12px;
    align-self: center;
    margin-bottom: 20px;
  `,
  TimeContainer: styled.li`
    flex: 1;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  `,
};
