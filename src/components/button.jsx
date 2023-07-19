import '../App.css';

export const Button =({name, onclick, num})=> {
  return (
    <button num={num} onClick={onclick}  className="button">{name}</button>
  );
}