import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../stylePickers/FontPicker';
import ColorPickerTool from '../stylePickers/ColorPicker';
import blocksType from "../../helper/blocksType"
import { selectWidgetCSSFont,selectWidgetCSS, setCSS, setFont, setTextColor, setTextContent } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList, getCurrentWidgetID, setWidget } from '../../states/WidgetListSlice/WidgetListSlice';

function StyledBlock({board,setBoard}) {
  const CSS = useSelector(selectWidgetCSS);
  const font = useSelector(selectWidgetCSSFont);
  const widgetList = useSelector(selectWidgetsList);
  const [content, setContent] = useState("");
  const [selectedblock, setSelectedblock] = useState(null);
  console.log('Board=',board);
  const dispatch = useDispatch();
  useEffect(() => {
    board.forEach((block) => {
      if (block.selected===true) {
        setSelectedblock(block);
      }
      block.children?.forEach((chilblock) => {
        if (chilblock.selected===true) {
          setSelectedblock(chilblock);
        }
      })

    });
  }, [board]);
  console.log(selectedblock);
    const changeFont = () => {
      const newState = board.map((block) => {
        if (block.selected===true) {
          // dispatch(setWidget({
          //   id: block.id,
          //   ...CSS
          // }));
          dispatch(setWidget({
            id: block.id,
            text: CSS.text,
            CSS: CSS
          }));
          return {...block, CSS: CSS};
        }else{
            return {...block, CSS: widgetList[block.id]}
        }
      });
      setBoard(newState);
    };  
    useEffect(() => {
      // Update the selected widget's properties
      changeFont();
      }, [font, CSS.color, CSS.text]);
    useEffect(() => {
        if(CSS.id != null)
        {
            console.log('Change text to: ', CSS.text.content);
            setContent(CSS.text.content);
        }
    }, [CSS.id]);

    const handleuploadImage = (e) => {
      const newState = board.map((block) => {
        if (block.selected===true) {
          return {...block, text: URL.createObjectURL(e.target.files[0])};
        }else if(block.children) {
           const newchildrens= block.children.map((chiblock) => {
            if (chiblock.selected===true) {
              return {...chiblock, text: URL.createObjectURL(e.target.files[0])};
            }else{
              return chiblock;
            }})
            
            return {...block, children: newchildrens};
        }else{
          return block;
        }
      });
      setBoard(newState);
    }; 
    
    return (
    <>
    {selectedblock?.type === blocksType.image? (<input
      class="form-control"
      type="file"
      name="myImage"
      onChange={(e) => handleuploadImage(e)}/>) :
      (selectedblock && 
      <Form>
        <Form.Group className="mb-3" controlId="textEditor">
          <Form.Control value={content} onChange={(e)=> { dispatch(setTextContent(e.target.value)); setContent(e.target.value)/*handleSelect(e);*/ }} type="text" placeholder="Enter Your Text" />
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