import Form from 'react-bootstrap/Form';

function StyledBlock({board,setBoard}) {
    const handelSelect = (e) => {
        console.log(e.target.value);
        const newState = board.map((block) => {
            // 👇️ if id equals 2, update country property
            if (block.selected===true) {
              return {...block, text: e.target.value };
            }else{
                return block
            }
      
          });
        setBoard(newState);
    };  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control onChange={(e)=>handelSelect(e)} type="text" placeholder="Enter Your Text" />
      </Form.Group>
    </Form>
  );
}

export default StyledBlock;