import styled from "@emotion/styled";

const SubTitle = ({ text }: { text: string }) => {
  return <Styles.Title>{text}</Styles.Title>;
};

export default SubTitle;

const Styles = {
  Title: styled.h2`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    margin-left: 20px;
    margin-bottom: 20px;
  `,
};
