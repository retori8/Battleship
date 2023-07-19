import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { BoardBox } from "../components/boardBox"


export const BoardUser = () => {
    const { store, actions } = useContext(Context);
    const cols = 11;
    const rows = 11;


    const printBoard = () => {
        const positions = store.selectedButton;
        const board = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const key = `${row}.${col}`;
                let content = "";
                let clas = store.class[0];
                if (row === 0) {
                    content = col;
                    clas = store.class[1];
                } else if (col === 0) {
                    content = row;
                    clas = store.class[1];
                } else {
                    for (let i = 0; i < positions.length; i++) {
                        if (key === String(positions[i])) {
                            clas = store.class[2];
                            content = "";
                        } else if (store.start === true) {
                            content = "";
                            clas = store.class[0];
                        }
                    }
                };

                const cell = (
                    <BoardBox
                        key={key}
                        content={content}
                        clas={clas}
                        onClick={(e) => (actions.handleClick(key))}
                    />
                );
                board.push(cell);
            }
        }
        return board;
    };

    return (

        <div className="board">{printBoard()}</div>
    );
};