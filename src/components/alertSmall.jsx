import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { AiFillCloseCircle } from 'react-icons/ai';

//communicates errors to the user in the selection of positions
export const AlertSmall = () => { 

    const { store, actions} = useContext(Context);
    const { alertSmall } = store

    return (
        <div className="alertsmall" show={alertSmall.show} role="alert">
            <p>{alertSmall.msn}</p>
            <h2><AiFillCloseCircle  onClick={(e) => (actions.close())}/></h2>
        </div>

    );
};