import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from './stylePickers/FontPicker';
import ColorPickerTool from './stylePickers/ColorPicker';
import { selectWidgetCSSFont,selectWidgetCSS, setFont, setTextColor } from '../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList, setWidget } from '../states/WidgetListSlice/WidgetListSlice';

function StyledBlock({board,setBoard}) {
  const CSS = useSelector(selectWidgetCSS);
  const font = useSelector(selectWidgetCSSFont);
  const widgetList = useSelector(selectWidgetsList);
  console.log(widgetList);
  const dispatch = useDispatch();
  const handleSelect = (e) => {
    const newState = board.map((block) => {
            if (block.selected===true) {
              return {...block, text: e.target.value, CSS: widgetList[block.id] };
            }else{
                return {...block, CSS: widgetList[block.id] };
            }
          });
        setBoard(newState);
    };  
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
      }, [font, CSS.color]);
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