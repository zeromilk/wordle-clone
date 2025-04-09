import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {}

const Row = ({ children }: Props) => {
  return <Styles.Container>{children}</Styles.Container>;
};

const Styles = {
  Container: styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto 8px;
    touch-action: manipulation;
  `,
};

export default Row;
