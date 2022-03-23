import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import useDidMountEffect from "../../../hooks/useDidMount";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useAtomValue } from "jotai/utils";
import { roomAtom } from "../../../atoms/room";
import Confetti from "./Confetti";

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
  );
};

const FeedbackContainer = styled(motion.div)`
  position: absolute;
  z-index: 10;
  display: flex;
  top: 40%;
  left: 48%;
  opacity: 0;
  pointer-events: none;
`;

const SubContainer = styled.div`
  position: relative;
`;

export default Feedback;
