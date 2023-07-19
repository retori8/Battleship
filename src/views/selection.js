import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { BoardBox } from "../components/boardBox"
import { Button } from "../components/button";
import { ButtonLg } from "../components/buttonLg";

export const Selection = () => {
    const { store, actions } = useContext(Context);
    const cols = 11;
    const rows = 11;

    const printBoard = () => {
        const positions = store.positionSelected;

        const board = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const key = `${row}.${col}`;
                let content = "";
                let clas = "boardBox";
                let color = { backgroundColor: 'rgb(129, 27, 159)' };

                if (row === 0) {
                    content = col;
                    clas = "boardBox2";
                } else if (col === 0) {
                    content = row;
                    clas = "boardBox2";
                }

                for (let i = 0; i < positions.length; i++) {
                    if (key === String(positions[i])) {
                        clas = "boardBox2";
                        break;
                    }
                }

                const cell = (
                    <BoardBox
                        key={key}
                        content={content}
                        clas={clas}
                        style={color}
                        onClick={() => handleClick()} // Llamar a handleClick
                    />
                );

                board.push(cell);

            }
        }

        return board;
    };

    const handleClick = () => {
        actions.changeVariable();
    };

    return (
        <div>
            <header className="background">
                <div className="buttoncontainer">
                    <p>You must position <br />your fleet.</p>
                    <Button onClick={handleClick} name="Aircraft Carrier: 4 box" />
                    <Button name="Submarine: 3 box" />
                    <Button name="Battleship: 3 box" />
                    <Button name="Destroyers: 2 box" />
                    <Button name="Frigates: 1 box" />
                    <ButtonLg name="Start Battle" />
                </div>
                <div className="board">{printBoard()}</div>
            </header>
        </div>
    );
};
