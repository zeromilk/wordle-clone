import { ComponentProps, useCallback } from "react";
import { css } from "@emotion/react";

//
import { Keyboard as _Keyboard } from "@/ui/inputs/Keyboard";
import { useKeyboardStore } from "@/stores/keyboard";
import { useKeyboardContext } from "./providers";

interface Props {
  keyObj: ComponentProps<typeof _Keyboard.Key>["keyObj"];
}

const Key = ({ keyObj }: Props) => {
  const { handleKeyPress } = useKeyboardContext();

  // 키 클릭 핸들러
  const onClick = useCallback(() => {
    handleKeyPress(keyObj.value);
  }, [keyObj.value, handleKeyPress]);

  // 키 별 상태
  const keyState = useKeyboardStore(
    (state) => state.keyStates[keyObj.value] || ""
  );

  return (
    <_Keyboard.Key
      className={keyState}
      onClick={onClick}
      keyObj={keyObj}
      css={css`
        transition: background-color 0.1s ease, color 0.1s ease;

        &.absent {
          background-color: #787c7e;
          color: white;
        }

        &.present {
          background-color: #c9b458;
          color: #fff;
        }

        &.correct {
          background-color: #6aaa64;
          color: #fff;
        }
      `}
    />
  );
};

export default Key;
