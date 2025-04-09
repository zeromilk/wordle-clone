import styled from "@emotion/styled";
import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: Props) => {
  return <Styles.Button {...props}>{children}</Styles.Button>;
};

export default Button;

const Styles = {
  Button: styled.button`
    min-width: min(14.75em, 300px);
    font-size: clamp(0.75em, 1vw + 0.25em, 0.875em);
    padding: 0px;

    position: relative;
    border: none;
    height: 3em;
    border-radius: 1.5em;
    align-content: center;
    letter-spacing: 0.05em;
    background: #000;
    color: #fff;
    margin: 0 10px 8px;
    font-weight: 400;

    width: 180px;
  `,
};
