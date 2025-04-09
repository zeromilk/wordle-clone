import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";

import Portal from "../Portal/Portal";
import Backdrop from "../Backdrop/Backdrop";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  open: boolean;
  onClose: () => void;
  hideBackdrop?: boolean;
  isFullScreen?: boolean;
  preventBackdropClick?: boolean;
}

const Modal = ({
  open,
  onClose,
  hideBackdrop,
  preventBackdropClick,
  className,
  children,
  ...props
}: Props) => {
  const openRef = useRef<boolean>(open);

  useEffect(() => {
    if (open && !hideBackdrop) {
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      if (open !== openRef.current) {
        document.documentElement.style.overflow = "";
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Styles.Container {...props}>
        {!hideBackdrop && (
          <Backdrop onClick={preventBackdropClick ? () => {} : onClose} />
        )}
        <Styles.Wrapper>{children}</Styles.Wrapper>
      </Styles.Container>
    </Portal>
  );
};

export default Modal;

const Styles = {
  Container: styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  `,
  Wrapper: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
