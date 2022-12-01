import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import useDidMountEffect from "../../../hooks/useDidMount";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useAtomValue } from "jotai/utils";
import { roomAtom } from "../../../atoms/room";
import Confetti from "./Confetti";
import { ScreenSizes } from "../../../Theme/ScreenSizes";

interface Props {}

const Feedback: FunctionComponent<Props> = ({}) => {
  const controls = useAnimation();
  const room = useAtomValue(roomAtom);

  const [animateConfetti, setAnimateConfetti] = useState(false);

  useDidMountEffect(() => {
    animate();
  }, [room.teams[room.currentTeamIndex].score]);

  async function animate() {
    setAnimateConfetti(true);
    await controls.start({
      opacity: 1,
      transition: { duration: 0 },
    });
    await controls.start({
      scale: 2,
      transition: { duration: 0.075 },
    });
    await controls.start({
      scale: 1.7,
      transition: { duration: 0.05 },
    });
    await controls.start({
      scale: 1.7,
      transition: { duration: 0.3 },
    });
    await controls.start({
      opacity: 0,
      scale: 1,
      transition: { duration: 0.05 },
    });
    setAnimateConfetti(false);
  }

  return (
    <Container>
      <FeedbackContainer animate={controls}>
        {room.lastGuess ? (
          <SubContainer>
            <Image src="/images/correct.svg" alt="correct" width={96} height={111} />
            <Confetti animate={animateConfetti} />
          </SubContainer>
        ) : (
          <Image src="/images/wrong.svg" alt="wrong" width={96} height={111} />
        )}
      </FeedbackContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  padding-bottom: 10%;

  ${ScreenSizes.large} {
    padding-bottom: 0;
  }
`;

const FeedbackContainer = styled(motion.div)`
  display: flex;
  opacity: 0;
`;

const SubContainer = styled.div`
  position: relative;
`;

export default Feedback;
