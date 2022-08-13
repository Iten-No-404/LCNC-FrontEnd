import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { setCSS } from '../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList } from '../states/WidgetListSlice/WidgetListSlice';

function Layers({board, setBoard}) {
  const widgetList = useSelector(selectWidgetsList);
  const dispatch = useDispatch();
  function resetChosenCSS(id) {      
    dispatch(setCSS({
    color: widgetList[id].color,
    font: widgetList[id].font,
    text: widgetList[id].text,
    id: id
  }));
}
  const handelSelect = (selindex) => {
    const newState = board.map((block,index) => {
        if (selindex===index) {
          resetChosenCSS(block.id);
          return {...block, selected: true};
        }else{
          return {...block, selected: false};
        }
  
      });
    setBoard(newState);
  };
  
  return (
    <ListGroup variant="dark" defaultActiveKey="#link1">
        {board.map((block,index) => {
          return (
          <ListGroup.Item key={index}  action onClick={()=>handelSelect(index)}>
            {block.type}
          </ListGroup.Item>
          )
        })}
    </ListGroup>
  );
}

export default Layers;