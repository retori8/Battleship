import '../App.css';
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button } from "../components/button";
import { ButtonLg } from "../components/buttonLg";
import { BsArrowLeftSquareFill } from 'react-icons/bs';

export const MiddleSection = () => {
    const { store, actions } = useContext(Context);
    return (


        <div className="buttoncontainer">
            <p>Choose the positions<br />of your fleet.<br /><h1><BsArrowLeftSquareFill /></h1></p>
            <Button name="Aircraft Carrier: 4 box" />
            <Button name="Submarine: 3 box" />
            <Button name="Battleship: 3 box" />
            <Button name="Destroyers: 2 box" />
            <Button name="Frigates: 1 box" />
            <ButtonLg name="Start Battle" onClick={(e) => (actions.start())} />
        </div>

    );
}