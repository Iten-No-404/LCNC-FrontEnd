import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../font-picker/font-picker';
import ColorPickerTool from '../color-picker/color-picker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import blocksType from "../../helper/blocksType";
import { selectWidgetCSS, setTextContent, setFontsizeval, setWidthval, setHeightval } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import StyleBlockHandler from './style-block-controller';

const StyledBlock = ({ board, setBoard }) => {
  console.log(board);
  const CSS = useSelector(selectWidgetCSS);
  const [content, setContent] = useState("");
  const [fontsize, setFontsize] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
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

  }, [CSS.font, CSS.color, CSS.text, CSS.background, CSS.width, CSS.height]);
  useEffect(() => {
    if (CSS.id != null) {
      setContent(CSS.text.content);
      setFontsize(CSS.font.size);
      setWidth(CSS.width);
      setHeight(CSS.height);
    }
  }, [CSS.id]);


  if (selectedblock?.type === blocksType.navbar)
    return(
      <>
        <div>Pick Background Color</div>
        <ColorPickerTool colorType='backgroundColor' />
      </>
    );

  return (
    <>
      {selectedblock?.type === blocksType.image ? (<input
        class="form-control"
        type="file"
        name="myImage"
        onChange={(e) => handleUploadImage(e)} />) :
        (selectedblock &&
          <Form>
            <Form.Group className="mb-3" controlId="textEditor">
              <Form.Control value={content} onChange={(e) => { dispatch(setTextContent(e.target.value)); setContent(e.target.value)/*handleSelect(e);*/ }} type="text" placeholder="Enter Your Text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fontsize">
            <Form.Label>Enter Font Size px</Form.Label>
              <Form.Control value={fontsize} onChange={(e) => { dispatch(setFontsizeval(e.target.value)); setFontsize(e.target.value) }} type="number" placeholder="ex: 20" />
            </Form.Group>
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