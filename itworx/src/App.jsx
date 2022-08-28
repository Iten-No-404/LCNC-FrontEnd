import './App.css';
import WorkSpace from './pages/workspace/worksapce';
import Preview from './pages/preview/Preview';
import Projects from './pages/projects/projects';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      {/* <WorkSpace /> */}
      <Routes>
        <Route  path="/" element={<WorkSpace />}></Route>
        <Route  path="/preview" element={<Preview />}></Route>
        <Route  path="/projects" element={<Projects />}></Route>
      </Routes>
      </div>
      </Router>
  );
}
export default App;
