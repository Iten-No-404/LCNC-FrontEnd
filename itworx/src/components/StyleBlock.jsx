import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from './stylePickers/FontPicker';
import ColorPickerTool from './stylePickers/ColorPicker';
import { selectWidgetCSSFont, selectWidgetsList,selectWidgetCSS, setFont, setTextColor, setWidget } from '../states/WidgetCSSSlice/WidgetCSSSlice';

function StyledBlock({board,setBoard}) {
  const CSS = useSelector(selectWidgetCSS);
  const font = useSelector(selectWidgetCSSFont);
  const widgetList = useSelector(selectWidgetsList);
  const dispatch = useDispatch();
  const handleSelect = (e) => {
    const newState = board.map((block) => {
            if (block.selected===true) {
              return {...block, text: e.target.value, font: widgetList[block.id].font, CSS: widgetList[block.id] };
            }else{
                return {...block, font: widgetList[block.id].font, CSS: widgetList[block.id] };
            }
          });
        setBoard(newState);
    };  
    const changeFont = () => {
      const newState = board.map((block) => {
        if (block.selected===true) {
          console.log({
            id: block.id,
            font: font, 
            text: CSS.text,
            CSS: CSS
          });
          dispatch(setWidget({
            id: block.id,
            font: font, 
            text: CSS.text,
            CSS: CSS
          }));
          return {...block, font: font, CSS: CSS};
        }else{
            return {...block, font: widgetList[block.id].font, CSS: widgetList[block.id]}
        }
      });
      setBoard(newState);
    };  
    useEffect(() => {
      // Update the selected widget's properties
      changeFont();
      }, [font, CSS.text]);
    return (
    <Form>
      <Form.Group className="mb-3" controlId="textEditor">
        <Form.Control onChange={(e)=>handleSelect(e)} type="text" placeholder="Enter Your Text" />
      </Form.Group>
      <Form.Group controlId="typographyStyles">
        <FontPickerTool />
        <ColorPickerTool colorType='textColor' />
      </Form.Group>
    </Form>
  );
}

export default StyledBlock;