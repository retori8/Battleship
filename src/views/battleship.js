import '../App.css';
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { UserBoard } from '../components/UserBoard';
import { MiddleSection } from '../components/sectionMiddle';
import { PcBoard } from '../components/PcBoard';
import { GameOverAlert } from '../components/gameOverAlert';
import { AlertSmall } from '../components/alertSmall';

export function BattleShip() {
    const { store } = useContext(Context);
    const { alert, alertSmall } = store

    return (
        <>
            {
                alert.show ?
                //if PC or user reaches 13 hit, congratulations and defeat alert is rendered
                    <GameOverAlert />
                    :
                    //If there are errors in the selection of user positions, a statement is rendered
                    alertSmall.show ?
                        <>
                            <div className="background">
                                <AlertSmall />
                                <UserBoard />
                                <MiddleSection />
                                <PcBoard />
                            </div>
                        </>
                        :
                        <div className="background">
                            <UserBoard />
                            <MiddleSection />
                            <PcBoard />
                        </div>
            }
        </>
    );
}