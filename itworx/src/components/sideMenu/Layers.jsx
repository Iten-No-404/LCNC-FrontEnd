import { useSelector, useDispatch } from 'react-redux';
import { setCSS } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList } from '../../states/WidgetListSlice/WidgetListSlice';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Block({board, setBoard ,block ,parentid= null}) {
  console.log(board);
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
      console.log({selindex,parentid});
      const newState =parentid? board.map((block) => {
        if (block.id===parentid) {
          const newchildrens= block.children.map((chiblock) => {
              if (selindex===chiblock.id) {
                return {...chiblock, selected: true};
              }else{
                return {...chiblock, selected: false};
              }})
          return {...block, children: newchildrens};
        }else{
          const newchildrens= block.children?.map((chiblock) => {
              return {...chiblock, selected: false};
          })

          return {...block, selected: false, children: newchildrens};
        }
      }) : board.map((block) => {
        if (selindex===block.id) {
          //resetChosenCSS(block.id);
          return {...block, selected: true};
        }else{
          const newchildrens= block.children?.map((chiblock) => {
            return {...chiblock, selected: false};
          })
          return {...block, selected: false, children: newchildrens};
        }
  
      });

    setBoard(newState);
  };

const handelDelete = (selindex) => {
  const newState =parentid? 
  board.map((block) => {
    if (block.id===parentid) {
      const newchildrens= block.children.filter((chiblock) => {
        return selindex!==chiblock.id
      })
      return {...block, children: newchildrens};
    }else{
      return block;
    }
  }) :
   board.filter((block) => {
    return selindex!==block.id
  });
  setBoard(newState);
  };
  
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
  );
}

function Layers({board, setBoard}) {
  const handelDelete = (selindex) => {
    const newState = board.filter((block) => {
      return selindex!==block.id
    });
    setBoard(newState);
    };

  return (
    <ListGroup variant="dark" defaultActiveKey="#link1">
        <Container>
        {board.map((block) => {
          return (block.children? (
            <Row key={block.id}>
            <Col xs={10}>
            <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{block.type}</Accordion.Header>
              <Accordion.Body>
              {
              block.children.map((chiblock)=>{
                return (<Block board={board} setBoard={setBoard} block={chiblock} parentid={block.id}/>)
              })
              }
              </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            </Col>
            <Col xs={2} className="m-0 p-0">
            <button onClick={()=>handelDelete(block.id)} > <img  src="https://img.icons8.com/sf-black-filled/200/000000/trash.png"/></button>
            </Col>
            </Row>
          ) :(<Block board={board} setBoard={setBoard} block={block} />) )
        })}
         </Container>
    </ListGroup>
  );
}

export default Layers;