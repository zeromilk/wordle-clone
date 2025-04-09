//
import { memo, useMemo } from "react";
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";
//
import { withFlipAnimation } from "@/HOC";
//
import { useOriginWord } from "../../(hooks)";
//
import { useWordleGameState } from "@/stores/wordle-game";
import { WORD_LEN } from "@/constants/wordle-game";
import { isEmpty } from "lodash-es";

interface LetterContentProps {
  roundIndex: number;
  letterIndex: number;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  css?: SerializedStyles;
}

const LetterContent = memo(
  ({
    roundIndex,
    letterIndex,
    className = "",
    containerRef,
    ...props
  }: LetterContentProps) => {
    const currentRoundIndex = useWordleGameState(
      (state) => state.currentRoundIndex
    );
    const letter = useWordleGameState(
      (state) => state.boardState[roundIndex][letterIndex]
    );

    const originWord = useOriginWord();
    const letterClass = useMemo(() => {
      if (roundIndex < currentRoundIndex) {
        if (!originWord.includes(letter)) {
          return "absent";
        }

        if (originWord[letterIndex] !== letter) {
          return "present";
        }

        if (originWord[letterIndex] === letter) {
          return "correct";
        }
      }

      if (roundIndex === currentRoundIndex) {
        if (isEmpty(letter)) {
          return "empty";
        } else {
          return "tbd";
        }
      }

      if (roundIndex > currentRoundIndex) {
        return "empty";
      }
    }, [currentRoundIndex, letter]);

    return (
      <Styles.Container
        ref={containerRef}
        className={className}
        style={{
          animationDelay: `${300 * letterIndex}ms`,
        }}
        {...props}
      >
        <Styles.Wrapper className={letterClass}>{letter}</Styles.Wrapper>
      </Styles.Container>
    );
  }
);

const Styles = {
  Container: styled.div<Pick<LetterContentProps, "css">>`
    ${({ css }) => css}
  `,
  Wrapper: styled.div`
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    font-size: 2rem;
    line-height: 1;
    font-weight: bold;
    vertical-align: middle;
    text-transform: uppercase;
    user-select: none;

    border: 2px solid #d3d6da;
    color: #000;

    &.empty {
    }

    &.tbd {
      border-color: #878a8c;
    }

    &.absent {
      border: none;
      background-color: #787c7e;
      color: white;
    }

    &.present {
      border: none;
      background-color: #c9b458;
      color: white;
    }

    &.correct {
      border: none;
      background-color: #6aaa64;
      color: white;
    }

    ::before {
      content: "";
      display: inline-block;
      padding-bottom: 100%;
    }
  `,
};

const FlipLetterContent = ({
  roundIndex,
  letterIndex,
}: {
  roundIndex: number;
  letterIndex: number;
}) => {
  // 상태 변화를 구독
  const validState = useWordleGameState((state) => state.validState);
  const setValidState = useWordleGameState((state) => state.setValidState);

  // withFlipAnimation 필요한 ShakeOptions 생성
  const shouldAnimate = validState === "valid";
  const onAnimationEnd = () => {
    if (letterIndex === WORD_LEN - 1) {
      setValidState("idle");
    }
  };

  // FlipLetterContent 컴포넌트에 옵션 전달
  const AnimatedContent = withFlipAnimation(LetterContent);

  return (
    <AnimatedContent
      roundIndex={roundIndex}
      letterIndex={letterIndex}
      shouldAnimate={shouldAnimate}
      onAnimationEnd={onAnimationEnd}
    />
  );
};
interface Props {
  roundIndex: number;
  letterIndex: number;
}

export default function BoardRowLetter({ roundIndex, letterIndex }: Props) {
  const currentRoundIndex = useWordleGameState(
    (state) => state.currentRoundIndex
  );

  // 렌더링할 컴포넌트를 결정
  const RenderComponent = useMemo(() => {
    // currentRoundIndex가 변할때, 렌더컴포넌트가 변하므로 flip되어지는건 이전 라운드
    if (roundIndex + 1 === currentRoundIndex) {
      return (
        <FlipLetterContent roundIndex={roundIndex} letterIndex={letterIndex} />
      );
    }

    // 현재 진행 중이지 않은 라운드 (과거, 미래)
    return <LetterContent roundIndex={roundIndex} letterIndex={letterIndex} />;
  }, [roundIndex, currentRoundIndex]);

  return RenderComponent;
}
