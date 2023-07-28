import '../App.css';

export const Button =({name, onclick})=> {
  return (
    <button onClick={onclick} className="button">{name}</button>
  );
}
