import React, { FunctionComponent } from "react";
import Button, { Props as ButtonProps } from "./Button";

type Props = Exclude<ButtonProps, "onClick">;

const Div: FunctionComponent<Props> = (props) => {
  return <Button {...props} />;
};

export default Div;
