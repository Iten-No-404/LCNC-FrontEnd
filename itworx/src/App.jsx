import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import WorkSpace from './pages/workspace/worksapce';
import AppHome from './pages/app-home/app-home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Landing from "./pages/landing/Landing";
import { selectUser, setUser, getUserThunk } from './states/user-slice/user-slice';
import Preview from './pages/preview/Preview';
import Projects from './pages/projects/projects';

function App() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOnAppSub, setIsOnAppSub] = useState(false);
  // console.log(isLoggedIn+' '+isOnAppSub);
  // console.log(user);
  useEffect(() => {
    dispatch(getUserThunk(id));
    let host = window.location.host;
    let parts = host.split(".");
    if(process.env.NODE_ENV === "development")
    {
      if(parts.length >= 2)
      {
        setIsOnAppSub(true);
      }
      else
        setIsOnAppSub(false);
    }
    else
    {
      // If we get more than 3 parts, then we have a subdomain
      // INFO: This could be 4, if you have a co.uk TLD or something like that.
      if (parts.length >= 3) {
        setIsOnAppSub(true);
      }
    }
}, []);
  useEffect(() => {
    if(user.isActive)
      setIsLoggedIn(true);
  }, [user.isActive])
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* {isLoggedIn && isOnAppSub && <Route path="/" element={<AppHome />} />} */}
          <Route path="/" element={<Landing />} />
          {isLoggedIn && isOnAppSub && <Route  path="/:id" element={<Projects />}></Route>}
          {isLoggedIn && isOnAppSub && <Route path="/project/:id" element={<WorkSpace />} />}
          {isLoggedIn && isOnAppSub && <Route  path="/project/:id/preview" element={<Preview />}></Route>}
          {/* <Route  path="/" element={<WorkSpace />}></Route> */}
      </Routes>
      </div>
    </Router>
  );
}
export default App;
