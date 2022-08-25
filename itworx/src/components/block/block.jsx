import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlockHandler from './block-controller';

const Block = ({ setBoard, block }) => {

	const { handelDelete, handelSelect } = BlockHandler(setBoard);

	return (
		<ListGroup variant="dark" className="mt-1 p-0"> 
		<Row key={block.id}>
			<Col xs={10}>
				<ListGroup.Item action onClick={() => handelSelect(block.id)}>
					{block.type}
				</ListGroup.Item>
			</Col>
			<Col xs={2} className="m-0 p-0">
				<button onClick={() => handelDelete(block.id)} > <img src="https://img.icons8.com/sf-black-filled/200/000000/trash.png" /></button>
			</Col>
		</Row>
		</ListGroup>
	);
}

export default Block;