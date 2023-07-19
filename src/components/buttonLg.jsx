import '../App.css';

export const ButtonLg = (props) => {
  return (
    <button onClick={props.onClick} className="buttonlg">{props.name}</button>
  );
}