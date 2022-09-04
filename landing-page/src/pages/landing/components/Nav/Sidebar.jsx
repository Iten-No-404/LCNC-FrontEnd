import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../assets/svg/Logo";
import { logOut, selectUser, selectUserAuthToken, selectUserUUID } from '../../../../states/user-slice/user-slice';

export default function Sidebar({ sidebarOpen, toggleSidebar, userPromptContoller }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authToken = useSelector(selectUserAuthToken);
  const uuid = useSelector(selectUserUUID);
  const { userPromptOpen, handlePromptClose, handlePromptOpen, promptType, setPromptTypeLogin, setPromptTypeSignUp  } = userPromptContoller;
  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <LogoIcon />
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            LCNC Design Tool
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Home
          </Link>
        </li>
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="services"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Services
          </Link>
        </li>
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="contact"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Contact
          </Link>
        </li>
      </UlStyle>
      {user.isActive &&
      <UlStyle className="flexSpaceCenter">
        <li className="semiBold font15">
          Welcome, {user.fullName.split(' ')[0]}!
        </li>
      </UlStyle>}
      <UlStyle className="flexSpaceCenter">
      {user.isActive ?
            <>
        <li className="semiBold font15 pointer">
          <div style={{ padding: "10px 30px 10px 0" }} className="whiteColor" onClick={() =>  { 
            if(process.env.REACT_APP_SPLIT === "true")
              window.location = process.env.REACT_APP_APP_URL + `/redirect/${uuid}`;
            else
              window.location = window.location.protocol + "//app." + window.location.host + `/redirect/${uuid}`;
        } }>
            My Projects
          </div>
        </li>
        <li className="semiBold font15 pointer flexCenter">
          <div className="radius8 lightBg" style={{ padding: "10px 15px" }} onClick={() =>  dispatch(logOut(false)) }>
          Log Out
          </div>
        </li>
        </>:
        <>
        <li className="semiBold font15 pointer">
          <div style={{ padding: "10px 30px 10px 0" }} className="whiteColor" onClick={() => { setPromptTypeLogin(); handlePromptOpen(); toggleSidebar(!sidebarOpen);}}>
            Log in
          </div>
        </li>
        <li className="semiBold font15 pointer flexCenter">
          <div className="radius8 lightBg" style={{ padding: "10px 15px" }} onClick={() => { setPromptTypeSignUp(); handlePromptOpen(); toggleSidebar(!sidebarOpen);}}>
            Sign Up
          </div>
        </li>
        </>
      }
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
