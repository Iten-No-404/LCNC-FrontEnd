import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./pages/landing/Landing";
import { selectUser, selectUserAuthToken, selectUserStatus, getAuthToken, getLoggedInUserThunk, logOut } from './states/user-slice/user-slice';
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
  useEffect(() => {
  if(!isLoggedIn && window.location.pathname !== '/logout'){
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
      if(window.location.pathname === '/logout')
      {
        dispatch(logOut(false));
        if(process.env.REACT_APP_SPLIT === "true")
          window.location = process.env.REACT_APP_APP_URL
        else
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
          {!isLoggedIn && <Route exact path="/logout" element={<div className="m-5" style={{ textAlign: 'center'}}>Logging you out!</div>}></Route>}
          <Route exact path="/logout" element={<div className="m-5" style={{ textAlign: 'center'}}>Logging you out!</div>}></Route>
          {!isLoading && <Route path="/" element={<Landing />} />}
          <Route path="/" element={<div className="m-5" style={{ textAlign: 'center'}}><Spinner animation="border" /></div>}/>
      </Routes>
      </div>
    </Router>
  );
}
export default App;
