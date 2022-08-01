import './App.css';
import Navigationbar from './components/Navbar';
import WorkSpace from './components/WorkSpace';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Navigationbar/>
      <div className="App">
        <WorkSpace/>
      </div>
    </DndProvider>  
  );
}

export default App;
