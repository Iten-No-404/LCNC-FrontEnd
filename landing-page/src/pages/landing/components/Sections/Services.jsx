import React from "react";
import styled from "styled-components";
// Components
import Developers from "../Elements/Developers";
import ServiceBox from "../Elements/ServiceBox";
// Assets
import AddImage1 from "../../assets/img/image4.jpg";
import AddImage2 from "../../assets/img/image2.jpg";

export default function Services() {
  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Awesome Features</h1>
            <p className="font13">
             The tool has basics features that will increase and more widgets will be added in the future.  
            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="add"
                title="Add widegts to project"
                subtitle="Widgets such as Navbar, Footer, header, div, span, and image can be added, nested, and reorder."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="download"
                title="Download the Project"
                subtitle="Download the code of any project in zip file."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="preview"
                title="Preview the Page"
                subtitle="Preview page to make sure all is okay before download."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox 
              icon="code"
              title="View the code"
              subtitle="View the auto generated HTML and CSS code." />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>

        <div className="lightBg">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>
                <h4 className="font15 semiBold">You can contribute!</h4>
                <h2 className="font40 extraBold">Open Source Project</h2>
                <p className="font12">
                Develop a low-code / no-code platform tool that builds simple web page
                using pre-defined widgets in the beginning as a POC and can be extended and continued later as 
                a complete low-code / no-code platform to build full web or mobile apps.
                </p>
                <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0"}}>
                  <div style={{ width: "190px" }}>
                    <a href="https://github.com/itworx/CodedSummer2022_LCNC_T6_Frontend" ><Button className="animate pointer radius8">Github Repository </Button></a>
                  </div>
                </ButtonsRow>
              </AddLeft>
              <AddRight>
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <img src={AddImage1} alt="office" />
                    </AddImgWrapp1>
                    <AddImgWrapp2>
                      <img src={AddImage2} alt="office" />
                    </AddImgWrapp2>
                  </div>
                </AddRightInner>
              </AddRight>
            </Advertising>
          </div>
        </div>

        
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Developers Team</h1>
            <p className="font20">
             Students in The faculty of Engineering Cairo University  
            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <Developers
                name="Iten Emad"
                image="https://avatars.githubusercontent.com/u/56697800?v=4"
                githuburl="https://github.com/Iten-No-404"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
            <Developers
                name="Taher Mohamed"
                image="https://avatars.githubusercontent.com/u/61603695?v=4"
                githuburl="https://github.com/Taher-Mohamed-Ahmed-Saad"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
            <Developers
                name="Abdullah Adel"
                image="https://avatars.githubusercontent.com/u/53022307?v=4"
                githuburl="https://github.com/abdullahalshawafi"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
            <Developers
                name="Mohamed Ahmed"
                image="https://avatars.githubusercontent.com/u/52926511?v=4"
                githuburl="https://github.com/mhmdahmedfathi"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
            <Developers
                name="Raghad Khaled"
                image="https://avatars.githubusercontent.com/u/60848147?v=4"
                githuburl="https://github.com/Raghad-Khaled"
              />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>

      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -40px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;


const Button = styled.button`
  border: 1px solid ${(props) => (props.border ? "#707070" : "#7620ff")};
  background-color: ${(props) => (props.border ? "transparent" : "#7620ff")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#707070" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#580cd2")};
    border: 1px solid #7620ff;
    color: ${(props) => (props.border ? "#7620ff" : "#fff")};
  }
`;