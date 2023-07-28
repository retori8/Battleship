import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { BoardBox } from "../components/boardBox";
import { BiCross } from 'react-icons/bi';


export const PcBoard = () => {
    const { store, actions } = useContext(Context);
    const cols = 11;
    const rows = 11;


    const printBoard = () => {
        const positions = store.shotInPcBoard;
        const board = [];
        const hit = store.hit;
        const start = store.start
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const key = `${row}.${col}`;
                let content = "";
                let clas = store.class[0];
                let disabled = true;
                //classifying the boxes that give the numbering to columns and rows
                if (row === 0) {
                    content = col;
                    clas = store.class[1];
                } else if (col === 0) {
                    content = row;
                    clas = store.class[1];
                
                } else {
                    //Only when the battle is started are the buttons on the board active
                    if (start === true){
                        disabled = false}
                    //if the position is present, a variable that stores the selected ones 
                    //it must render a cross and be disabled to use it again    
                    for (let i = 0; i < positions.length; i++) {
                        if (key === String(positions[i])) {
                            content = <BiCross />;
                            disabled = true;
                        }
                        //and if it is stored in the successful shots the color changes
                        else if (key === String(hit[i])) {
                            clas = store.class[3];
                            disabled = true;
                        }
                    }
                };
                //for each cycle it returns a box with all these parameters
                const cell = (
                    <BoardBox
                        key={key}
                        content={content}
                        disabled={disabled}
                        clas={clas}
                        onClick={(e) => (actions.handleClickPc(key))}
                    />
                );
                board.push(cell);
            }
        }
        //returns the complete cycle with the 11 x 11 boxes
        return board;
    };

    return (

        <div id={store.pcLight} className="board">{printBoard()}</div>
    );
};