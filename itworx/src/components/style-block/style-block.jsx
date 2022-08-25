import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../font-picker/font-picker';
import ColorPickerTool from '../color-picker/color-picker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import blocksType from "../../helper/blocksType";
import { selectWidgetCSSFont, selectWidgetCSS, setTextContent, setFontsizeval } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import StyleBlockHandler from './style-block-controller';

const StyledBlock = ({ board, setBoard }) => {
  console.log(board);
  const CSS = useSelector(selectWidgetCSS);
  const font = useSelector(selectWidgetCSSFont);
  const [content, setContent] = useState("");
  const [fontsize, setFontsize] = useState(10);
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

  }, [font, CSS.color, CSS.text]);
  useEffect(() => {
    if (CSS.id != null) {
      setContent(CSS.text.content);
      setFontsize(CSS.font.size);
    }
  }, [CSS.id]);


  if (selectedblock?.type === blocksType.navbar)
    return;

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
              <Form.Control value={fontsize} onChange={(e) => { dispatch(setFontsizeval(e.target.value)); setFontsize(e.target.value) }} type="number" placeholder="Enter Font Size px" />
            </Form.Group>
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