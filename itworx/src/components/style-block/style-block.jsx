import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../font-picker/font-picker';
import ColorPickerTool from '../color-picker/color-picker';
import blocksType from "../../helper/blocksType";
import { selectWidgetCSSFont, selectWidgetCSS, setTextContent } from '../../states//widget-css-slice//widget-css-slice';
import StyleBlockHandler from './style-block-controller';

const StyledBlock = ({ board, setBoard }) => {
  const CSS = useSelector(selectWidgetCSS);
  const font = useSelector(selectWidgetCSSFont);
  const [content, setContent] = useState("");
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
            <Form.Group controlId="typographyStyles">
              <FontPickerTool />
              <ColorPickerTool colorType='textColor' />
            </Form.Group>
          </Form>)
      }
    </>
  );
}

export default StyledBlock;