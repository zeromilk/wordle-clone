import { css, SerializedStyles } from "@emotion/react";
import { ComponentType, memo, useMemo, useRef } from "react";
import useAnimationEnd from "@/hooks/useAnimationEnd";
import { shakeAnimation } from "@/utils/animation";

interface ShakeableProps {
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  css?: SerializedStyles;
}

interface ShakeOptions {
  shouldAnimate: boolean;
  onAnimationEnd?: () => void;
}

// 범용적인 흔들림 애니메이션 HOC
const withShakeAnimation = <P extends ShakeableProps>(
  WrappedComponent: ComponentType<P>
) => {
  return memo((props: P & ShakeOptions) => {
    const { shouldAnimate, onAnimationEnd, ...restProps } = props;

    const className = useMemo(() => {
      return shouldAnimate ? "shake" : "";
    }, [shouldAnimate]);

    const keyRef = useRef<HTMLDivElement>(null);

    useAnimationEnd(keyRef, shouldAnimate, () => {
      onAnimationEnd?.();
    });

    const animationStyles = useMemo<SerializedStyles>(() => {
      return css`
        &.shake {
          ${shakeAnimation}
        }
      `;
    }, []);

    return (
      <WrappedComponent
        {...(restProps as unknown as P)}
        className={className}
        containerRef={keyRef}
        css={animationStyles}
      />
    );
  });
};

export default withShakeAnimation;
