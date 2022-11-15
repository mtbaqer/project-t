import React, {FunctionComponent} from "react";
import styled from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import {RoomStatus} from "../../../types/types";
import Button from "../../Button";
import Div from "../../Div";

interface Props {
    status: RoomStatus;
    isNextHinter: boolean;
    isInCurrentTeam: boolean;
}

const ActionArea: FunctionComponent<Props> = ({status, isNextHinter, isInCurrentTeam}) => {
    const {onStartTurn, onEndTurn, onEndGame} = useRoomActions();

    if (status === "waiting") {
        return isNextHinter ? (
            <Button onClick={onStartTurn} imageSource="/images/play.svg" text="START"/>
        ) : (
            <Div text="WAITING FOR OTHER PLAYER TO START" big/>
        );
    }

    if (status === "paused") {
        return (
            <PauseContainer>
                <Div text="PAUSED"/>
                {isInCurrentTeam && <Button onClick={onEndTurn} text="END TURN"/>}
                <Button onClick={onEndGame} text="END GAME"/>
            </PauseContainer>
        );
    }

    return null;
};

const PauseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default ActionArea;
