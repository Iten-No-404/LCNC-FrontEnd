import ListGroup from 'react-bootstrap/ListGroup';

function Layers({board, setBoard}) {
  const handelSelect = (selindex) => {
    const newState = board.map((block,index) => {
        if (selindex===index) {
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
          <ListGroup.Item  action onClick={()=>handelSelect(index)}>
            {block.type}
          </ListGroup.Item>
          )
        })}
    </ListGroup>
  );
}

export default Layers;