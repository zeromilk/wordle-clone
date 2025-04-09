import { useWordleGameResultModalStore } from "@/stores/modal";
import Modal from "@/ui/utils/Modal/Modal";
import styled from "@emotion/styled";
import CloseSVG from "@/images/icon/CloseSVG";
import Statistics from "./Statistics";
import GuessDistribution from "./GuessDistribution";
import PlayTime from "./PlayTime";

const WordleGameResultModal = () => {
  const { isOpen, setIsOpen } = useWordleGameResultModalStore();

  return (
    <Modal open={isOpen} onClose={() => {}}>
      <Styles.Container>
        <Styles.Wrapper>
          <div className="inner__wrapper">
            <Styles.ExitBox>
              <button onClick={() => setIsOpen(false)}>
                <CloseSVG width={30} height={30} />
              </button>
            </Styles.ExitBox>
            <Styles.Header>Contratulations!</Styles.Header>
            <PlayTime />
            <Statistics />
            <GuessDistribution />
          </div>
        </Styles.Wrapper>
      </Styles.Container>
    </Modal>
  );
};

const Styles = {
  Container: styled.div`
    width: 100vh;
    height: 100vh;
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    width: 520px;

    .inner__wrapper {
      margin: 0 auto;
      width: 343px;
    }
  `,
  ExitBox: styled.div`
    display: flex;
    justify-content: right;
  `,
  Header: styled.h1`
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    margin: 8px 0;
  `,
};

export default WordleGameResultModal;
