import React, { FunctionComponent } from "react";
import PlayArea from "./PlayArea/PlayArea";
import HUD from "./HUD/HUD";
import Teams from "../Teams/Teams";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  return (
    <>
      <HUD />
      <PlayArea />
      <Teams />
    </>
  );
};

export default Board;
