import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import WorkSpace from './pages/workspace/worksapce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { selectUser, selectUserAuthToken, selectUserStatus, getAuthToken, getLoggedInUserThunk, logOut } from './states/user-slice/user-slice';
import Preview from './pages/preview/Preview';
import Projects from './pages/projects/projects';
import HomePage from './pages/homepage';
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
    useEffect(() => {
        if (!isLoggedIn && window.location.pathname !== '/logout') {
            dispatch(getAuthToken());
            setGotAuthToken(true);
        }
    }, [])
    useEffect(() => {
        if (authToken !== "") {
            dispatch(getLoggedInUserThunk(authToken));
            setIsGettingUserInfo(true);
        }
        else {
            if (process.env.REACT_APP_SPLIT === "true") {
                if (window.location.pathname === '/logout') {
                    dispatch(logOut(false));
                    window.location = process.env.REACT_APP_LANDING_URL;
                }
            }
            else {
                if (window.location.pathname === '/logout') {
                    dispatch(logOut(false));
                    var domain = window.location.host.split('.');
                    domain.shift();
                    window.location = window.location.protocol + "//" + domain.join('.');
                }
            }
            setIsLoading(false);
        }
    }, [gotAuthToken])
    useEffect(() => {
        if (userStatus === "fulfilled" && isGettingUserInfo) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, [userStatus])
    useEffect(() => {
        if (user.isActive && !isLoggedIn) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, [user.isActive])
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/redirect/:uuid" element={<RedirectPage />}></Route>
                    {!isLoggedIn && <Route exact path="/logout" element={<div className="m-5" style={{ textAlign: 'center'}}>Logging you out!</div>}></Route>}
                    {/* {isLoading && <Route exact path="/" element={<div className="m-5" style={{ textAlign: 'center'}}><Spinner animation="border" /></div>}/>} */}
                    {isLoggedIn && <Route exact path="/" element={<Projects />}></Route>}
                    {isLoggedIn && <Route exact path="/project/:id" element={<WorkSpace />} />}
                    {isLoggedIn && <Route exact path="/project/:id/preview" element={<Preview />}></Route>}
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
