import './App.css';
import WorkSpace from './components/WorkSpace';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <WorkSpace/>
      </div>
    </DndProvider>  
  );
}

export default App;
