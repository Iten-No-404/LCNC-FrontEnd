import { useSelector, useDispatch } from 'react-redux';
import { setCSS } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList } from '../../states/WidgetListSlice/WidgetListSlice';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const newState = board.map((block) => {
        if (selindex===block.id) {
          resetChosenCSS(block.id);
          return {...block, selected: true};
        }else{
          return {...block, selected: false};
        }
  
      });
    setBoard(newState);
  };

const handelDelete = (selindex) => {
  const newState = board.filter((block) => {
    return selindex!==block.id
  });
  setBoard(newState);
  };
  
  return (
    <ListGroup variant="dark" defaultActiveKey="#link1">
        <Container>
        {board.map((block,index) => {
          return (              
             <Row key={block.id}>
                <Col xs={10}>
                 <ListGroup.Item  action onClick={()=>handelSelect(block.id)}>
                   {block.type}
                 </ListGroup.Item>
                </Col>
                <Col xs={2} className="m-0 p-0">
                <button onClick={()=>handelDelete(block.id)} > <img  src="https://img.icons8.com/sf-black-filled/200/000000/trash.png"/></button>
                </Col>
              </Row>
          )
        })}
         </Container>
    </ListGroup>
  );
}

export default Layers;