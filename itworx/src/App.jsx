import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import WorkSpace from './pages/workspace/worksapce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./pages/landing/Landing";
import { logInThunk, getUserThunk, selectUser } from './states/user-slice/user-slice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnAppSub, setIsOnAppSub] = useState(false);
  useEffect(() => {
    dispatch(getUserThunk(5));
    setIsLoggedIn(true);
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
  // if(isLoggedIn)
  //   window.location
  return (
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn && isOnAppSub && <Route path="/" element={<WorkSpace />} />}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Landing />} />
          <Route path="/signup" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
