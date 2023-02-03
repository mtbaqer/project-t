import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Panel from "../Panel";
import Text from "../Text";

interface Props {}

const HowToPlay: FunctionComponent<Props> = ({}) => {
  return (
    <Panel title="How to Play" size="l">
      <Text size="s">
        <Color>1.</Color> Create a game room
        <br />
        <br />
        <Color>2.</Color> Invite your friends to join the game room by sharing the game room link.
        <br />
        <br />
        <Color>3.</Color> Connect with your friends using your favorite audio or video chat.
        <br />
        <br />
        <Color>4.</Color> When everyone has selected a team, you can start the game by clicking the start button.
        <br />
        <br />
        <Color>5.</Color> <del>Crush the other teams&apos; hopes and dreams.</del> Score as many points as possible.
      </Text>
    </Panel>
  );
};

const Color = styled.span`
  color: #e74c3c;
`;

export default HowToPlay;
