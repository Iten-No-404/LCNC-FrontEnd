import React from "react";
import styled from "styled-components";

export default function Developers({image, name,githuburl }) {
  

  return (
    <Wrapper className="text-center justify-content-center">
      <a href={githuburl} > <img className="mx-auto d-block rounded-circle" width={150} alt="preview" src={image}/> </a>
      <TitleStyle className="font20 extraBold">{name}</TitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;