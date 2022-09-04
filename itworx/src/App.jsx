import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import WorkSpace from './pages/workspace/worksapce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./pages/landing/Landing";
import { selectUser, selectUserAuthToken, selectUserStatus, getAuthToken, getLoggedInUserThunk, logOut } from './states/user-slice/user-slice';
import Preview from './pages/preview/Preview';
import Projects from './pages/projects/projects';
import RedirectPage from './pages/redirectPage/RedirectPage';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const authToken = useSelector(selectUserAuthToken);
  const [isLoading, setIsLoading] = useState(true);
  const [gotAuthToken, setGotAuthToken] = useState(false);
  const [isGettingUserInfo, setIsGettingUserInfo] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnAppSub, setIsOnAppSub] = useState(false);
  console.log("isLoading:" , isLoading);
  useEffect(() => {
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
        // If we get 4 or more parts, then we have a subdomain
        if (parts.length >= 4) {
          setIsOnAppSub(true);
        }
      }
    }, []);
  useEffect(() => {
  if(!isLoggedIn){
    dispatch(getAuthToken());
    setGotAuthToken(true);
  }
  }, [])
  useEffect(() => {
    if(authToken !== ""){
      dispatch(getLoggedInUserThunk(authToken));
      setIsGettingUserInfo(true);
    }
    else
    {
      setIsLoading(false);
      if(isOnAppSub && window.location.pathname === '/')
      {
        var domain = window.location.host.split('.');
        domain.shift();
        window.location = window.location.protocol + "//" + domain.join('.') + '/logout';
      }
      else if(isOnAppSub && window.location.pathname === '/logout')
      {
        dispatch(logOut(false));
        var domain = window.location.host.split('.');
        domain.shift();
        window.location = window.location.protocol + "//" + domain.join('.');
      }
      else if(window.location.pathname === '/logout')
      {
        dispatch(logOut(false));
        window.location = window.location.protocol + "//" + window.location.host;
      }
    }
  }, [gotAuthToken])
  useEffect(() => {
  if(userStatus === "fulfilled" && isGettingUserInfo){
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [userStatus])
  useEffect(() => {
  if(user.isActive && !isLoggedIn){
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [user.isActive])
  return (
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn && isOnAppSub && <Route exact path="/" element={<Projects />}></Route>}
          {isOnAppSub && <Route exact path="/redirect/:token" element={<RedirectPage isOnAppSub={isOnAppSub} />}></Route>}
          {isLoggedIn && isOnAppSub && <Route exact path="/project/:id" element={<WorkSpace />} />}
          {isLoggedIn && isOnAppSub && <Route exact path="/project/:id/preview" element={<Preview />}></Route>}
          {isLoggedIn && !isOnAppSub && <Route exact path="/logout" element={<div className="m-5" style={{ textAlign: 'center'}}>Logging you out!</div>}></Route>}
          {!isLoading && !isOnAppSub && <Route path="/" element={<Landing />} />}
          <Route path="/" element={<div className="m-5" style={{ textAlign: 'center'}}><Spinner animation="border" /></div>}/>
      </Routes>
      </div>
    </Router>
  );
}
export default App;
