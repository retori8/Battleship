import '../App.css';
import { BoardPC } from '../components/boardPC'
import { BoardUser } from '../components/boardUser';
import { MiddleSection } from '../components/sectionMiddle';


export function Battle() {
  return (
    <div className="background">
      
      <BoardUser/>
      <MiddleSection/>
      <BoardPC />
    </div>
  );
}