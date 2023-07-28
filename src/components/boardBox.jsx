import React from "react";
import '../App.css';

//each box on the board
export const BoardBox = ({content, clas, onClick, disabled, row, col}) => {

  return (
    <button className={clas} onClick={onClick} disabled ={disabled} row={row} col={col}>
      {content}
    </button>
  );
};


