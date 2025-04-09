//
import { memo, useMemo } from "react";
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";
//
import BoardRowLetter from "./BoardRow.Letter";
import { withShakeAnimation } from "@/HOC";
//
import { useWordleGameState } from "@/stores/wordle-game";
import { WORD_LEN } from "@/constants/wordle-game";

interface RowContentProps {
  roundIndex: number;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  css?: SerializedStyles;
}

const RowContent = memo(
  ({ roundIndex, className = "", containerRef, ...props }: RowContentProps) => {
    return (
      <Styles.Container ref={containerRef} className={className} {...props}>
        {new Array(WORD_LEN).fill("").map((_, index) => (
          <BoardRowLetter
            key={index}
            roundIndex={roundIndex}
            letterIndex={index}
          />
        ))}
      </Styles.Container>
    );
  }
);

const Styles = {
  Container: styled.div<Pick<RowContentProps, "css">>`
    display: grid;
    grid-template-columns: repeat(${WORD_LEN}, 1fr);
    grid-gap: 5px;

    ${({ css }) => css};
  `,
};

const ShakingRowContent = ({ roundIndex }: { roundIndex: number }) => {
  // 상태 변화를 구독
  const validState = useWordleGameState((state) => state.validState);
  const setValidState = useWordleGameState((state) => state.setValidState);

  // withShakeAnimation에 필요한 ShakeOptions 생성
  const shouldAnimate = validState === "invalid";
  const onAnimationEnd = () => {
    setValidState("idle");
  };

  // ShakingRowContent 컴포넌트에 옵션 전달
  const AnimatedContent = withShakeAnimation(RowContent);

  return (
    <AnimatedContent
      roundIndex={roundIndex}
      shouldAnimate={shouldAnimate}
      onAnimationEnd={onAnimationEnd}
    />
  );
};

interface Props {
  roundIndex: number;
}

export default function BoardRow({ roundIndex }: Props) {
  // 현재 라운드 인덱스만 구독
  const currentRoundIndex = useWordleGameState(
    (state) => state.currentRoundIndex
  );

  // 렌더링할 컴포넌트를 결정
  const RenderComponent = useMemo(() => {
    // 현재 진행 중인 라운드 (현재)
    if (roundIndex === currentRoundIndex) {
      return <ShakingRowContent roundIndex={roundIndex} />;
    }

    // 현재 진행 중이지 않은 라운드 (과거, 미래)
    return <RowContent roundIndex={roundIndex} />;
  }, [roundIndex, currentRoundIndex]);

  return RenderComponent;
}
