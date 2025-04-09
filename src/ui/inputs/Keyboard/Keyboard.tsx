"use client";

import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import Row, { Props as RowProps } from "./Row";
import Key, { Props as KeyProps } from "./Key";

interface Props extends PropsWithChildren {}

const _Keyboard = ({ children }: Props) => {
  return <Styles.Container>{children}</Styles.Container>;
};

interface KeyboardComponent extends React.FC<Props> {
  Row: React.FC<RowProps>;
  Key: React.FC<KeyProps>;
}

const Keyboard = _Keyboard as KeyboardComponent;
Keyboard.Row = Row;
Keyboard.Key = Key;

export default Keyboard;

const Styles = {
  Container: styled.div`
    height: 200px;
    width: 100%;
    margin: 0 8px;
    user-select: none;
  `,
};
