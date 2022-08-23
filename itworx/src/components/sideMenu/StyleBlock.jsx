import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../stylePickers/FontPicker';
import ColorPickerTool from '../stylePickers/ColorPicker';
import blocksType from "../../helper/blocksType"
import { selectWidgetCSSFont,selectWidgetCSS, setCSS, setFont, setTextColor, setTextContent } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList, getCurrentWidgetID, setWidget } from '../../states/WidgetListSlice/WidgetListSlice';


const recursiveAddimage = (myBoard,e) => {
  if (myBoard && myBoard.length > 0) {
    let newBoard = [];
    myBoard.forEach(block => {
      if (block.selected) {
        const newBlock = { ...block, text: URL.createObjectURL(e.target.files[0]) };
        newBoard.push(newBlock);
      } else {
        const val = recursiveAddimage(block.children, e);
        if (val.length > 0) {
          const newBlock = { ...block,children: val };
          newBoard.push(newBlock);
        } else {
          newBoard.push(block);
        }
      }
    }
    );
    return newBoard;
  } else {
    return [];
  }
}



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
    useEffect(() => {
      // Update the selected widget's properties
      setBoard((prevBoard) => {
        return recursiveChangeCSS(prevBoard);
      })

      }, [font, CSS.color, CSS.text]);
    useEffect(() => {
        if(CSS.id != null)
        {
            console.log('Change text to: ', CSS.text.content);
            setContent(CSS.text.content);
        }
    }, [CSS.id]);

    const handleuploadImage = (e) => {
      setBoard((prevBoard) => {
        return recursiveAddimage(prevBoard,e);
      })
    }; 

    const recursiveChangeCSS = (myBoard) => {
      if (myBoard && myBoard.length > 0) {
        let newBoard = [];
        myBoard.forEach(block => {
          if (block.selected) {
            dispatch(setWidget({
              id: block.id,
              text: CSS.text,
              CSS: CSS
            }));
            const newBlock = { ...block, CSS:CSS };
            newBoard.push(newBlock);
          } else {
            const val = recursiveChangeCSS(block.children);
            if (val.length > 0) {
              const newBlock = { ...block,children: val };
              newBoard.push(newBlock);
            } else {
              newBoard.push(block);
            }
          }
        }
        );
        return newBoard;
      } else {
        return [];
      }
    }
    
    
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