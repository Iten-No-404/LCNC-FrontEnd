import './App.css';
import WorkSpace from './pages/workspace/worksapce';
import Preview from './pages/preview/Preview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      {/* <WorkSpace /> */}
      <Routes>
        <Route  path="/" element={<WorkSpace />}></Route>
        <Route  path="/preview" element={<Preview />}></Route>
      </Routes>
      </div>
      </Router>
  );
}
export default App;
