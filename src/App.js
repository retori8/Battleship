import './App.css';
import { Row } from './components/row'; 
import { RowNumber } from './components/rowNumber';
import { Button } from './components/button';
import { ButtonLg } from './components/buttonLg';

export function App() {
  return (
    <div className="App">
      <header className="background">
        <div className="buttoncontainer">
          <p>You must position <br/>your fleet.</p>
          <Button name="Aircraft Carrier"></Button>
          <Button name="Submarine"></Button>
          <Button name="Battleship"></Button>
          <Button name="Destroyers"></Button>
          <Button name="Frigates"></Button>
          <ButtonLg name="Start Battle"></ButtonLg>
        </div>
        <div className="board">
          <RowNumber />
          <Row id="1" />
          <Row id="2" />
          <Row id="3" />
          <Row id="4" />
          <Row id="5" />
          <Row id="6" />
          <Row id="7" />
          <Row id="8" />
          <Row id="9" />
          <Row id="10" />
        </div>
      </header>
    </div>
  );
}


