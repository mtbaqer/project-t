import React, { FunctionComponent } from "react";
import Panel from "../Panel";
import Text from "../Text";

interface Props {}

const About: FunctionComponent<Props> = ({}) => {
  return (
    <Panel title="About" size="l">
      <Text size="s">
        Say Don&apos;t Say is a free online multiplayer word guessing game.
        <br />
        <br />
        A game consists of a few round, each round a player (hinter) has to make their teammates (guessers) say the
        target word without using a set of related words listed on the cards.
        <br />
        <br />
        For each said target word, the team gets a point. The team with the most points at the end of the game, will
        then be crowned as the winner!
        <br />
        <br />
        Have fun!
      </Text>
    </Panel>
  );
};

export default About;
