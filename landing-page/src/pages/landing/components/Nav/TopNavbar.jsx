import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import styled from "styled-components";
import { Link } from "react-scroll";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { logOut, selectUser, selectUserAuthToken } from '../../../../states/user-slice/user-slice';

export default function TopNavbar({userPromptContoller}) {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authToken = useSelector(selectUserAuthToken);

  const { userPromptOpen, handlePromptClose, handlePromptOpen, promptType, setPromptTypeLogin, setPromptTypeSignUp  } = userPromptContoller;

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} userPromptContoller={userPromptContoller}/>
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              LCNC Design Tool
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            {user.isActive ?
            <>
            <li className="semiBold font15">
              <OverlayTrigger placement='bottom-end' className="p-1" overlay={<Tooltip >Logged in with: {user.email}</Tooltip>}>
                <div className="justify-content-end mr-2" >Welcome, {user.fullName.split(' ')[0]}!</div>
              </OverlayTrigger>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <div className="radius8" style={{ padding: "10px 15px" }} onClick={() =>  { 
                if(process.env.REACT_APP_SPLIT === "true")
                  window.location = process.env.REACT_APP_APP_URL + `/redirect/${authToken}`;
                else
                  window.location = window.location.protocol + "//app." + window.location.host + `/redirect/${authToken}`;
                } }>
                My Projects
              </div>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <div className="radius8 lightBg" style={{ padding: "10px 15px" }} onClick={() =>  { 
                dispatch(logOut(false));
                if(process.env.REACT_APP_SPLIT === "true")
                  window.location = process.env.REACT_APP_APP_URL + "/logout";
                else
                  window.location = window.location.protocol + "//app." + window.location.host + "/logout";
                 } }>
                Log Out
              </div>
            </li>
            </>:
            <>
            <li className="semiBold font15 pointer">
              <div href="/" style={{ padding: "10px 30px 10px 0" }} onClick={() => { setPromptTypeLogin(); handlePromptOpen(); }}>
                Log in
              </div>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <div className="radius8 lightBg" style={{ padding: "10px 15px" }} onClick={() => { setPromptTypeSignUp(); handlePromptOpen(); }}>
                Sign Up
              </div>
            </li>
            </>
            }
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


