import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const CenterContentTemplate = ({ children }: PropsWithChildren) => {
  return <Styles.Container>{children}</Styles.Container>;
};

const Styles = {
  Container: styled.main`
    position: relative;
    height: 100%;
    width: 100%;
    max-height: calc(100% - 210px);
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  `,
};

export default CenterContentTemplate;
