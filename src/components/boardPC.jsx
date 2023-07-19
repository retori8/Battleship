import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../App.css';
import { BoardBox } from "./boardBox"
import { BsFire } from 'react-icons/bs';
import { BiCross } from 'react-icons/bi';

export const BoardPC = () => {
  const { store, actions } = useContext(Context);
  const cols = 11;
  const rows = 11;

  const printBoard = () => {
    const positions = store.positionSelected;
    const goodshot = store.userGoodShot;
    const wrongshot = store.userWrongShot;

    const board = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = `${row}.${col}`;
        let content = "";
        let clas = store.class[0];
        let color = { backgroundColor: 'rgb(129, 27, 159)' };

        if (row === 0) {
          content = col;
          clas = store.class[1];
        } else if (col === 0) {
          content = row;
          clas = store.class[1];
        } else {
          for (let i = 0; i < goodshot; i++) {
            if (key === String(goodshot[i])) {
              clas = store.class[3];
              content = <BsFire />;
              console.log(store.userGoodShot, "mapeo de color")
            }
          }
          for (let i = 0; i < wrongshot; i++) {
            if (key === String(wrongshot[i])) {
              content = <BiCross />;
              clas = store.class[3];
            }
          }
        };
        const cell = (
          <BoardBox
            key={key}
            content={content}
            clas={clas}
            style={color}
            onClick={(e) => (actions.getShot(key))}
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


