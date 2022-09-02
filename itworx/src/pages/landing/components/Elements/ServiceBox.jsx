import React from "react";
import styled from "styled-components";

export default function ServiceBox({icon, title, subtitle}) {
  let getIcon;

  switch (icon) {
    case "preview":
      getIcon = "https://img.icons8.com/ultraviolet/45/000000/preview-pane.png";
      break;
    case "download":
      getIcon = "https://img.icons8.com/office/40/000000/downloads-folder.png";
      break;
    case "code":
      getIcon = "data:image/png;base64,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";
      break;
    case "add":
      getIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAD+ElEQVR4nO2bTUxcVRiGn++UW6AQLLUpTGtiWpWmVhTxNzbVtlCaoiyMxYURN9VEm7SJVhOjmzFxoUaJguICNvaHRCGpCZA2hRlMq3GhpRTUpmNaN8pfQsGK0M7EOS6GCzMtg6J35gzDfZKbnPOdk7nveXN+5ru5V7iOioqanHDGVLlWcpvS2rq+fTGitQ6KqItZ6mpXW1vbZHSbRJfLK6tfRfSbwE3JlZg0xgXe7uxorQU0wDIAr9erMnJWH0V4BcgyqTDBZAEVGzZuuuNS4PwxmJ4B5ZXVryH6PbvXWk8B995TTG5uriGdzjIxMcHZc/0MDA7PxLTIQV97S61UVNTkhK2p35ie9rt3lbH/xb1YVlos/xlCoRB1DU2c6PTbofFsdW2d0tbVMqYHv9ZTmJaDB7AsiwP7nsdTWGCHVk7+lblDaXSRHSktuXtm8OFwmI8+acTXfQqtNQBaa3zdp/4xlqpYlkVpSfFsQElRBkIu07rz82c3//pPm2g/3kn78ZMgQtm2rfi/Os07H9RHOswTS2VWrcqfKQs6T8XvKvGb0oiMeA37X9qLCNx15ya2P7YFgB3btoIIgswbW0zENUApxYF9L8TEZI4pPldsMTHPElgaxMyAH3+6wOetX5rS4jgiikcefoBb1nni9okxoKe3j57evoQLSyYdJ07yWePHcduVhOViEvWkHBlbHtx89Jvv+vXTe548bFqM02RlZbL90flPppnDXqf63ziHONT8BYebWyIV4a0lfwq4Bni9XrWzsrqmy5/6yUwiUF9//8OzWvShd2vr8XWfNq0n6Shgg10ZGBoyKMUM7h5gWoBp4maD/xUNnBmJlO9bk/pPFRw34MwINF+Yrd+/xuk7OIvjS2B0au5yqrLk9wDXANMCTOMaYFqAaVwDTAswjWuAaQGmWfIGOJ4LRPPLFfD/msg73Eje8oUlYQk1IDAeuUzwb5OwtFwCC0nBEzoD1udFrmTiyYHSBaTgCTWgaCXsujWRd/j/pOUSWAiuAaYFmMY1wLQA07gGmBZgGtcA0wJM4xrg9A/enD1bXp0dv1+q4HguEJ2LLyQpMYXjBggRExYL7h5gWoBplGj+sCuXL4+Z1JIURkejxhjWvysRHbDrZ8/1EwqFTOhKCsFgKPZlcFEBlSlBHzAOMDA4TF1DU1qaEAyGqGtoZGh4xA6N/bkCvwDsfHzPQQ3v2y2ewgJKS4qjPzFb1AwMDtPT2xc9eICXuzpaP7SPbCl/4qkjaHnGgL6ko+GIr6P1OUAvs4OXAuePrd+4+YrAQ6Tv98NjwBu+jtbXmf54+oZH6FVVVSuu6eVl4TC3I5Iea0DrYY38PJkjvm9bWmJe3fobHv8n0fEiV58AAAAASUVORK5CYII=";
      break;
    default:
      getIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAB2UlEQVR4nO3aXU7CQBSG4U/jLoAb//YuDVfiCoybQUmEBagXbcnYzNDSMzNt6fskk9iBnKbH9psBlQAAAAAAACJbSiokHSX9zmQcJW0kPcVo3n4EFzTU2EtaWBpYVIVerYUmZiFpq/LaXyyF6sd2Ts2rrVRe+7elSH0rz1Xr9d/2LOwuLIfq54dqFNXcuSAeOtvOjah8RUMLy07Sp2feF8RDN6lrA81N9RVoLixu4Ibmm0E8xmjI1kDfwrJy3uubbwbx1TSwTwbWBW8Cr4fmZ8n3G9hUc1uVebiU9Oa81zdfdKg7tGyP8LOkL+c1dxHZeeb3kh4Ddcc42q7/IqECC5ULw0Flvq0l3avcxqyr+Xp702yeW3eMo8v1dzbGRy2nJIsIHDTQ6K7j++b8GJ/FHWjU9Q6c6+a49cnjDjSigUY00KhvAz8kvWc8zn3+zvo28Ef/Azb1ce7zR8NHOT7KpRUrA2O7NANTny8oVgbGdmkGpj5fb2QgGZjWtewDrQbPwKH3gVZkYCJkYGpTbeDkM3BoZOBEkIGpsQ801mMfmKbeCRlIBqbF94HGenwfmKbeCRlIBqZ1LftA/i7ccpz7/NGQgWRgWjTQiAYa8T/SRtyBAAAAAAAAOf0BYtlo1rKSaX0AAAAASUVORK5CYII=";
      break;
  }


  return (
    <Wrapper className="text-center justify-content-center">
      <img className="mx-auto d-block" width={40} alt="preview" src={getIcon}/> 
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13">{subtitle}</SubtitleStyle>
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