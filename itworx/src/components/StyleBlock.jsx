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
    // Update the document title using the browser API
    changeFont();
  }, [font]);
  // console.log("Before changing the board ",font);
    const handelSelect = (e) => {
        // console.log(e.target.value);
        const newState = board.map((block) => {
            // 👇️ if id equals 2, update country property
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
        // 👇️ if id equals 2, update country property
        if (block.selected===true) {
          dispatch(setWidget({
            id: block.id,
            font: font
          }));
          return {...block, font: font};
          // block.fontChange = true;
          // return {...block};
        }else{
          // block.fontChange = false;
            return {...block, font: widgetList[block.id]}
        }
      });
    setBoard(newState);
    };  
  return (
    <Form>
      <Form.Group controlId="typographyStyles">
        {/* <FontPickerTool onChange={()=>changeFont()}/> */}
        <FontPickerTool />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control onChange={()=>handelSelect()} type="text" placeholder="Enter Your Text" />
      </Form.Group>
    </Form>
  );
}

export default StyledBlock;