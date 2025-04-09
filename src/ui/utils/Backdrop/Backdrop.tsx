import styled from "@emotion/styled";

import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  onClick?: () => void;
}

const Backdrop = ({ onClick, children, className, ...props }: Props) => {
  return (
    <Styles.Container className={className} onClick={onClick} {...props}>
      {children}
    </Styles.Container>
  );
};

export default Backdrop;

const Styles = {
  Container: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    /* zindex: globalVars.zIndex.backdrop; */
    border-radius: inherit;
  `,
};
