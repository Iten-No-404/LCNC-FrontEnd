import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from './stylePickers/FontPicker';
import { selectWidgetCSSFont, selectWidgetsList, setFont, setWidget } from '../states/WidgetCSSSlice/WidgetCSSSlice';

function StyledBlock({board,setBoard}) {
  const font = useSelector(selectWidgetCSSFont);
  const widgetList = useSelector(selectWidgetsList);
  const dispatch = useDispatch();
  useEffect(() => {
    // Update the selected widget's properties
    changeFont();
  }, [font]);
    const handleSelect = (e) => {
        const newState = board.map((block) => {
            if (block.selected===true) {
              dispatch(setFont(widgetList[block.id]));
              return {...block, text: e.target.value, font: widgetList[block.id] };
            }else{
                return {...block, font: widgetList[block.id] };
            }
          });
        setBoard(newState);
    };  
    const changeFont = () => {
      const newState = board.map((block) => {
        if (block.selected===true) {
          dispatch(setWidget({
            id: block.id,
            font: font
          }));
          return {...block, font: font};
        }else{
            return {...block, font: widgetList[block.id]}
        }
      });
    setBoard(newState);
    };  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="textEditor">
        <Form.Control onChange={(e)=>handleSelect(e)} type="text" placeholder="Enter Your Text" />
      </Form.Group>
      <Form.Group controlId="typographyStyles">
        <FontPickerTool />
      </Form.Group>
    </Form>
  );
}

export default StyledBlock;