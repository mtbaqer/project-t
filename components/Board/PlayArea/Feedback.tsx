import React, { FunctionComponent } from "react";
import Image from "next/image";
import useDidMountEffect from "../../../hooks/useDidMount";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useAtomValue } from "jotai/utils";
import { roomAtom } from "../../../atoms/room";

interface Props {}

const Feedback: FunctionComponent<Props> = ({}) => {
  const controls = useAnimation();
  const room = useAtomValue(roomAtom);

  useDidMountEffect(() => {
    animate();
  }, [room.teams[room.currentTeamIndex].score]);

  async function animate() {
    await controls.start({
      scale: 4,
      transition: { type: "spring", duration: 0.3 },
    });
    await controls.start({
      scale: 4,
      transition: { type: "spring", duration: 0.1 },
    });
    await controls.start({
      opacity: 0,
      transition: { type: "spring", duration: 0.1 },
    });
    await controls.start({
      opacity: 1,
      scale: 0,
      transition: { type: "spring", duration: 0 },
    });
  }

  return (
    <FeedbackContainer animate={controls}>
      {room.lastGuess ? (
        <Image src="/images/correct.svg" alt="correct" width={48} height={55.5} />
      ) : (
        <Image src="/images/wrong.svg" alt="wrong" width={48} height={55.5} />
      )}
    </FeedbackContainer>
  );
};

const FeedbackContainer = styled(motion.div)`
  position: absolute;
  z-index: 10;
  display: flex;
  top: 40%;
  left: 49%;
  transform: translate(-50%, -50%);
  transform: scale(0);
`;

export default Feedback;
