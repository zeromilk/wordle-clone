import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";

export type TKey = {
  value: string;
  label: string | ReactNode;
};

export interface Props
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> {
  keyObj: TKey;
  onClick: (value: TKey["value"]) => void;
  css?: SerializedStyles;
}

const Key = ({ keyObj, onClick, ...props }: Props) => {
  return (
    <Styles.Button onClick={() => onClick(keyObj.value)} {...props}>
      <span>{keyObj.label}</span>
    </Styles.Button>
  );
};

const Styles = {
  Button: styled.button<Pick<Props, "css">>`
    margin: 0 6px 0 0;
    height: 58px;
    border-radius: 4px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    background-color: #d3d6da;
    color: #000;

    ${({ css }) => css}
  `,
};

export default Key;
