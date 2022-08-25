import { useSelector, useDispatch } from 'react-redux';
import { setCSS } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import { selectWidgetsList } from '../../states/WidgetListSlice/WidgetListSlice';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const recursiveRemoveChild = (myBoard, id) => {
  if (myBoard && myBoard.length > 0) {
    myBoard.forEach(e => {
      if (e.id === id) {
        myBoard.splice(myBoard.indexOf(e), 1);
        return;
      } else {
        recursiveRemoveChild(e.children, id);
      }
    }
    );
  }
}

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
  const recursiveSelect = (myBoard, id) => {
    if (myBoard && myBoard.length > 0) {
      let newBoard = [];
      myBoard.forEach(block => {
        if (block.id === id) {
          resetChosenCSS(block.id);
          const val = recursiveSelect(block.children, id);
          if (val.length > 0) {
            const newBlock = { ...block, selected: true ,children: val };
            newBoard.push(newBlock);
          } else {
            const newBlock = { ...block, selected: true };
            newBoard.push(newBlock);
          }
        } else {
          const val = recursiveSelect(block.children, id);
          if (val.length > 0) {
            const newBlock = { ...block, selected: false ,children: val };
            newBoard.push(newBlock);
          } else {
            const newBlock = { ...block, selected: false };
            newBoard.push(newBlock);
          }
        }
      }
      );
      return newBoard;
    } else {
      return [];
    }
  }

  const handelSelect = (selindex) => {
      console.log({selindex});
      setBoard((prevBoard) => {
        return recursiveSelect(prevBoard,selindex);
      })
  };

const handelDelete = (selindex) => {
  console.log('Delete this:',{selindex});
  setBoard((prevBoard) => {
    let newboard=[...prevBoard];
    recursiveRemoveChild(newboard,selindex)
    return newboard;
  })
  };
  
  return (
    <ListGroup variant="dark">           
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
      </ListGroup>
  );
}

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

  const handelDelete = (selindex) => {
    console.log('Delete this:',{selindex});
    setBoard((prevBoard) => {
      let newboard=[...prevBoard];
      recursiveRemoveChild(newboard,selindex)
      return newboard;
    })
    };

    const recursiveSelect = (myBoard, id) => {
      if (myBoard && myBoard.length > 0) {
        let newBoard = [];
        myBoard.forEach(block => {
          if (block.id === id) {
            resetChosenCSS(block.id);
            const val = recursiveSelect(block.children, id);
            if (val.length > 0) {
              const newBlock = { ...block, selected: true ,children: val };
              newBoard.push(newBlock);
            } else {
              const newBlock = { ...block, selected: true };
              newBoard.push(newBlock);
            }
          } else {
            const val = recursiveSelect(block.children, id);
            if (val.length > 0) {
              const newBlock = { ...block, selected: false ,children: val };
              newBoard.push(newBlock);
            } else {
              const newBlock = { ...block, selected: false };
              newBoard.push(newBlock);
            }
          }
        }
        );
        return newBoard;
      } else {
        return [];
      }
    }

    const handelSelect = (selindex) => {
      console.log({selindex});
      setBoard((prevBoard) => {
        return recursiveSelect(prevBoard,selindex);
      })
  };

  return (
    // <ListGroup variant="dark" defaultActiveKey="#link1">
        <Container className="m-0 p-0">
        {board.map((block) => {
          console.log(block);
          console.log(block.children.length > 0);
          return ((block.children && block.children.length > 0) ? (
            <Row key={block.id} className="m-0 p-0">
            <Col xs={10} className="m-0 p-0">
            <Accordion className="m-0 p-0">
            <Accordion.Item eventKey="0">
              <Accordion.Header action onClick={()=>handelSelect(block.id)} >{block.type}</Accordion.Header>
              <Accordion.Body className="m-1 p-1">
              {
              //block.children.map((chiblock)=>{
              <Layers board={block.children} setBoard={setBoard} />
              //})
              }
              </Accordion.Body>
            </Accordion.Item >
            </Accordion>
            </Col>
            <Col xs={2} className="m-0 p-0">
            <button onClick={()=>handelDelete(block.id)} > <img  src="https://img.icons8.com/sf-black-filled/200/000000/trash.png"/></button>
            </Col>
            </Row>
          ) :(<Block board={board} setBoard={setBoard} block={block} />) )
        })}
         </Container>
    // </ListGroup>
  );
}

export default Layers;