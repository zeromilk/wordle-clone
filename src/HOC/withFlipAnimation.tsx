import { css, SerializedStyles } from "@emotion/react";
import { ComponentType, memo, useMemo, useRef } from "react";
import useAnimationEnd from "@/hooks/useAnimationEnd";
import { flipBackwordAnimation } from "@/utils/animation";

interface FlipableProps {
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  css?: SerializedStyles;
}

interface FlipOptions {
  shouldAnimate: boolean;
  onAnimationEnd?: () => void;
}

// 범용적인 흔들림 애니메이션 HOC
const withFlipAnimation = <P extends FlipableProps>(
  WrappedComponent: ComponentType<P>
) => {
  return memo((props: P & FlipOptions) => {
    const { shouldAnimate, onAnimationEnd, ...restProps } = props;

    const className = useMemo(() => {
      return shouldAnimate ? "flip" : "";
    }, [shouldAnimate]);

    const keyRef = useRef<HTMLDivElement>(null);

    useAnimationEnd(keyRef, shouldAnimate, () => {
      onAnimationEnd?.();
    });

    const animationStyles = useMemo<SerializedStyles>(() => {
      return css`
        &.flip {
          ${flipBackwordAnimation}
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

export default withFlipAnimation;
