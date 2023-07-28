import '../App.css';
import { ButtonLg } from '../components/buttonLg';
import { Link } from "react-router-dom";


export function Home() {
    return (
        <div className="title">
            <h1 className="textitle">Battleship <Link to="/battleship"><ButtonLg name="START"/></Link></h1>
        </div>
    );
}
