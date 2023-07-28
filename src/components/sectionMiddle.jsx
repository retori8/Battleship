import '../App.css';
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button } from "../components/button";
import { ButtonLg } from "../components/buttonLg";

//sign with instruction
//list and order of selection of positions
//button start battle
export const MiddleSection = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="buttonscontainer">
            <h6 className="sign">{store.msn}</h6>
            <Button name="1.º Aircraft Carrier: 4 box"  />
            <Button name="2.º Submarine: 3 box" />
            <Button name="3.º Battleship: 3 box" />
            <Button name="4.º Destroyer: 2 box" />
            <Button name="5.º Frigate: 1 box" />
            <ButtonLg name="START BATTLE" onClick={(e) => (actions.start())} />
        </div>
    );
}