import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import WorkSpace from './pages/workspace/worksapce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Landing from "./pages/landing/Landing";
import { selectUser, getLoggedInUserThunk } from './states/user-slice/user-slice';
import Preview from './pages/preview/Preview';
import Projects from './pages/projects/projects';
import RedirectPage from './pages/redirectPage/RedirectPage';

function App() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOnAppSub, setIsOnAppSub] = useState(false);
  useEffect(() => {
    // dispatch(getUserThunk(id));
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
  if(user.isActive && !isLoggedIn){
      setIsLoggedIn(true);
    }
  }, [user.isActive])
  return (
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn && isOnAppSub && <Route exact path="/" element={<Projects />}></Route>}
          <Route path="/" element={<Landing />} />
          {isOnAppSub && <Route exact path="/redirect/:token" element={<RedirectPage isOnAppSub={isOnAppSub} />}></Route>}
          {isLoggedIn && isOnAppSub && <Route exact path="/project/:id" element={<WorkSpace />} />}
          {isLoggedIn && isOnAppSub && <Route exact path="/project/:id/preview" element={<Preview />}></Route>}
      </Routes>
      </div>
    </Router>
  );
}
export default App;
