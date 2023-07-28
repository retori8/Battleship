import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { ButtonLg } from './buttonLg';
import { useNavigate } from "react-router-dom";

//if PC or user reaches 13 hit, congratulations and defeat alert is rendered
export const GameOverAlert = () => {
    const { store} = useContext(Context);
    const { alert } = store
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);}

    return (
        <div className="alert" show={alert.show} role="alert">
            <p>{alert.msn}</p>
            <div className="buttonsAlert">
                <ButtonLg onClick={(e) => (refreshPage())} name={alert.button} />
            </div>
        </div>

    );
}