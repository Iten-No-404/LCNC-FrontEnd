import React, { useEffect, useState } from "react";
// Sections
import TopNavbar from "./components/Nav/TopNavbar";
import Header from "./components/Sections/Header";
import Services from "./components/Sections/Services";
import Contact from "./components/Sections/Contact";
import Footer from "./components/Sections/Footer";
import UserPrompt from "./components/Elements/UserPrompt";

export default function Landing() {
  const [userPromptOpen, setUserPrompt] = useState(false);
  const handlePromptClose = () => setUserPrompt(false);
  const handlePromptOpen = () => setUserPrompt(true);
  const [promptType, setPromptType] = useState('Login');
  const setPromptTypeLogin = () => setPromptType('Login');
  const setPromptTypeSignUp = () => setPromptType('SignUp');
  const userPromptContoller = {
    userPromptOpen,
    handlePromptClose,
    handlePromptOpen,
    promptType,
    setPromptTypeLogin, 
    setPromptTypeSignUp
  };
  return (
    <>
      <TopNavbar userPromptContoller={userPromptContoller} />
      <UserPrompt userPromptContoller={userPromptContoller}/>
      <Header />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}


