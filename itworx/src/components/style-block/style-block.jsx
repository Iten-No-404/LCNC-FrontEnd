import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../font-picker/font-picker';
import ColorPickerTool from '../color-picker/color-picker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { selectWidgetCSS, setTextContent, setFontsizeval, setWidthval, setHeightval, setPaddingval, setMarginval, setBoarderrediusval } from '../../states/widget-css-slice/widget-css-slice';
import StyleBlockHandler from './style-block-controller';

const StyledBlock = ({ board, setBoard }) => {
  console.log(board);
  const CSS = useSelector(selectWidgetCSS);
  const [content, setContent] = useState("");
  const [fontsize, setFontsize] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState();
  const [margin, setMargin] = useState("");
  const [padding, setPadding] = useState("");
  const [boarderredius,setBoarderredius] = useState("");
  const [selectedblock, setSelectedblock] = useState(null);
  const dispatch = useDispatch();
  const {
    handleUploadImage,
    recursiveChangeCSS
  } = StyleBlockHandler(setBoard);

  useEffect(() => {
    board.forEach((block) => {
      if (block.selected === true) {
        setSelectedblock(block);
      }
      block.children?.forEach((chilblock) => {
        if (chilblock.selected === true) {
          setSelectedblock(chilblock);
        }
      })

    });
  }, [board]);
  useEffect(() => {
    // Update the selected widget's properties
    setBoard((prevBoard) => {
      return recursiveChangeCSS(prevBoard);
    })

  }, [CSS]);
  useEffect(() => {
    if (CSS.id != null) {
      setContent(CSS.text.content);
      //setFontsize(CSS.font.size);
      //setWidth(CSS.width);
      //setHeight(CSS.height);
    }
  }, [CSS.id]);


  if (selectedblock?.type === "navbar")
    return(
      <>
        <div>Pick Background Color</div>
        <ColorPickerTool colorType='backgroundColor' />
      </>
    );

  return (
    <>
      {selectedblock?.type === 'image' ? (
        <>
          <input
          class="form-control"
          type="file"
          name="myImage"
          onChange={(e) => handleUploadImage(e)} />
          <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="fontsize">
                <Form.Label>Width %</Form.Label>
                <Form.Control value={width} onChange={(e) => { dispatch(setWidthval(e.target.value)); setWidth(e.target.value) }} type="number" placeholder="ex: 100"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="fontsize">
                <Form.Label>Height px</Form.Label>
                <Form.Control value={height} onChange={(e) => { dispatch(setHeightval(e.target.value)); setHeight(e.target.value) }} type="number" placeholder="ex: 100" />
              </Form.Group>
          </div>
          <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="padding">
                <Form.Label>Padding px</Form.Label>
                <Form.Control value={padding} onChange={(e) => { dispatch(setPaddingval(e.target.value)); setPadding(e.target.value) }} type="number" placeholder="ex: 5"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="margin">
                <Form.Label>Margin px</Form.Label>
                <Form.Control value={margin} onChange={(e) => { dispatch(setMarginval(e.target.value)); setMargin(e.target.value) }} type="number" placeholder="ex: 5" />
              </Form.Group>
          </div>
          <Form.Group>
          <Form.Label>Border Radius %</Form.Label>
              <Form.Control value={boarderredius} onChange={(e) => { dispatch(setBoarderrediusval(e.target.value)); setBoarderredius(e.target.value) }} type="number" placeholder="ex: 20" />
          </Form.Group>
          <div>Pick Background Color</div>
          <ColorPickerTool colorType='backgroundColor' />
         </>   
        ) :
        (selectedblock &&
          <Form>
            <Form.Group className="mb-3" controlId="textEditor">
              <Form.Control value={content} onChange={(e) => { dispatch(setTextContent(e.target.value)); setContent(e.target.value)/*handleSelect(e);*/ }} type="text" placeholder="Enter Your Text" />
            </Form.Group>
            <div className="d-flex flex-row">
            <Form.Group className="mb-3" controlId="fontsize">
            <Form.Label>Font Size px</Form.Label>
              <Form.Control value={fontsize} onChange={(e) => { dispatch(setFontsizeval(e.target.value)); setFontsize(e.target.value) }} type="number" placeholder="ex: 20" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fontsize">
            <Form.Label>Border Radius %</Form.Label>
              <Form.Control value={boarderredius} onChange={(e) => { dispatch(setBoarderrediusval(e.target.value)); setBoarderredius(e.target.value) }} type="number" placeholder="ex: 20" />
            </Form.Group>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>Width %</Form.Label>
                <Form.Control value={width} onChange={(e) => { dispatch(setWidthval(e.target.value)); setWidth(e.target.value) }} type="number" placeholder="ex: 100"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="height">
                <Form.Label>Height px</Form.Label>
                <Form.Control value={height} onChange={(e) => { dispatch(setHeightval(e.target.value)); setHeight(e.target.value) }} type="number" placeholder="ex: 100" />
              </Form.Group>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="padding">
                <Form.Label>Padding px</Form.Label>
                <Form.Control value={padding} onChange={(e) => { dispatch(setPaddingval(e.target.value)); setPadding(e.target.value) }} type="number" placeholder="ex: 5"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="margin">
                <Form.Label>Margin px</Form.Label>
                <Form.Control value={margin} onChange={(e) => { dispatch(setMarginval(e.target.value)); setMargin(e.target.value) }} type="number" placeholder="ex: 5" />
              </Form.Group>
            </div>
            <Form.Group controlId="typographyStyles">
              <FontPickerTool />
              <Tabs
                defaultActiveKey="font"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="font" title="Font Color">
                  <ColorPickerTool colorType='textColor' />
                </Tab>
                <Tab eventKey="background" title="Background Color">
                  <ColorPickerTool colorType='backgroundColor' />
                </Tab>
              </Tabs>
            </Form.Group>
          </Form>)
      }
    </>
  );
}

export default StyledBlock;