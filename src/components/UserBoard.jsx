import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { BoardBox } from "./boardBox"
import { BiCross } from 'react-icons/bi';


export const UserBoard = () => {
    const { store, actions } = useContext(Context);
    const cols = 11;
    const rows = 11;


    const printBoard = () => {
        const positions = store.positionsUser;
        const pcGame = store.shotInUserBoard
        const hitPc = store.hitPC
        const board = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const key = `${row}.${col}`;
                let content = "";
                let clas = store.class[0];
                //classifying the boxes that give the numbering to columns and rows
                if (row === 0) {
                    content = col;
                    clas = store.class[1];
                } else if (col === 0) {
                    content = row;
                    clas = store.class[1];
                //if the position is present, a variable that stores the selected ones it must render a cross
                } else if (pcGame.length > 0) {
                    for (let i = 0; i < pcGame.length; i++) {
                        if (key === String(pcGame[i])) {
                            content = <BiCross />;
                            clas = store.class[0];
                        }
                    //and if it is stored in the successful shots the color changes    
                    for (let i = 0; i < hitPc.length; i++) {
                            if (key === String(hitPc[i])) {
                                content = <BiCross />;
                                clas = store.class[3];
                            }}
                    }
                } else if (positions.length > 0) {
                    for (let i = 0; i < positions.length; i++) {
                        if (store.start === true) {
                            content = "";
                            clas = store.class[0];
                        //if there are stored positions they will be rendered in cyan color    
                        } else if (key === String(positions[i])) {
                            clas = store.class[2];
                            content = "";
                        }
                    }
                };
                //for each cycle it returns a box with all these parameters
                const cell = (
                    <BoardBox
                        key={key}
                        content={content}
                        col={col}
                        row={row}
                        clas={clas}
                        onClick={(e) => (actions.handleClickUser(key, col, row))}
                    />
                );
                board.push(cell);
            }
        }
        //returns the complete cycle with the 11 x 11 boxes
        return board;
    };

    return (
        
        <div id={store.userLight} className="board">{printBoard()}</div>
    );
};