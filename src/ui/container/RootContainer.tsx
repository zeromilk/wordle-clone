"use client";

import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const RootContainer = ({ children }: PropsWithChildren) => {
  return <Styles.Container>{children}</Styles.Container>;
};

const Styles = {
  Container: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: auto;
  `,
};
export default RootContainer;
