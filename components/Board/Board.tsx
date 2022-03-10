import React, { FunctionComponent } from "react";
import CardArea from "./CardArea/CardArea";
import HUD from "./HUD/HUD";
import Teams from "../Teams/Teams";

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
