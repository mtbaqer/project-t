import React, { FunctionComponent } from "react";
import CardArea from "./CardArea";
import HUD from "./HUD";
import Teams from "./Teams";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  return (
    <>
      <HUD />
      <CardArea />
      <Teams />
    </>
  );
};

export default Board;
