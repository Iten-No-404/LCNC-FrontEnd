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

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const authToken = useSelector(selectUserAuthToken);
  console.log(window.location.pathname);
  console.log("Token:" , authToken);
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
        // If we get more than 3 parts, then we have a subdomain
        // INFO: This could be 4, if you have a co.uk TLD or something like that.
        if (parts.length >= 4) {
          setIsOnAppSub(true);
        }
      }
    }, []);
  useEffect(() => {
  console.log('1. Check if Token is in localstorage');
  if(!isLoggedIn){
    dispatch(getAuthToken());
    setGotAuthToken(true);
  }
  }, [])
  useEffect(() => {
    console.log('2. Check if Token can be used to get user data');
    if(authToken !== ""){
      dispatch(getLoggedInUserThunk(authToken));
      setIsGettingUserInfo(true);
    }
    else
    {
      setIsLoading(false);
      console.log(window.location.pathname);
      if(isOnAppSub && window.location.pathname === '/')
      {
        var domain = window.location.host.split('.');
        domain.shift();
        window.location = window.location.protocol + "//" + domain.join('.') + './logout';
      }
      else if(window.location.pathname === '/logout')
      {
        dispatch(logOut(false));
        window.location = window.location.protocol + "//" + window.location.host;
      }
    }
  }, [gotAuthToken])
  useEffect(() => {
    console.log('3. Check if User is logged in');
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
          <Route path="/" element={<div className="m-5" style={{ textAlign: 'center'}}>Now loading!!!</div>}/>
      </Routes>
      </div>
    </Router>
  );
}
export default App;
