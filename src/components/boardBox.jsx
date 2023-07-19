
import React from "react";
import '../App.css';

export const BoardBox = ({ content, clas, onClick}) => {

  return (
    <button className={clas}  onClick={onClick}>
      {content}
    </button>
  );
};
