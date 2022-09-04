import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Layers from '../layers/layers';
import StyledBlock from '../style-block/style-block';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectBlocksList } from '../../states/blocks-list-slice/blocks-list-slice';
import GeneralCodeBlock from '../blocks/general-code-block';

/**
 * That the side menue that show three Tabs 
 * 
 *1- first one show the available widgets that can be drag and drop
 * 
 *2- second one show the layers component
 * 
 *3- third one show the styled block comonent
 */
function Ctabs({ board, setBoard, projectId }) {
  const blocksList = useSelector(selectBlocksList);
  return (
    <div>
      <Droppable droppableId="selectWidgetTab" isDropDisabled={true} type="board" >
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={21}>
            <Tabs
              defaultActiveKey="widgets"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="widgets" title="Blocks" className='Blocks' style={{ overflow: 'scroll', maxHeight: '500px'}}>
                {
                  blocksList.map((block)=>{
                    return (
                      <Draggable draggableId={block.id} key={block.id} index={block.id} >
                      {(provided, snapshot) => (
                        <>
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="mt-3">
                            <GeneralCodeBlock isDragging={snapshot.isDragging} classN="blockTab" id={block.id} text={block.text} code1={block.widgetCodeSnippet.code1} code2={block.widgetCodeSnippet.code2} />
                          </div>
                          {snapshot.isDragging && (
                            <GeneralCodeBlock classN="blockTab" id={block.id} text={block.text} code1={block.widgetCodeSnippet.code1} code2={block.widgetCodeSnippet.code2} />
                          )}
                        </>
                      )}
                    </Draggable>
                    )
                  })
                }
              </Tab>
              <Tab eventKey="layers" title="Layers">
                <Layers board={board} setBoard={setBoard} />
              </Tab>
              <Tab eventKey="style" title="Style">
                <StyledBlock board={board} setBoard={setBoard} projectId={projectId} />
              </Tab>
            </Tabs>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Ctabs;

Ctabs.propTypes = {
   /** board is have the all widget that is in the project */
  board: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type:  PropTypes.string,
      text: PropTypes.string,
      selected: PropTypes.bool,
      widgetCodeSnippet: PropTypes.shape({
        code1: PropTypes.string,
        code2:  PropTypes.string,
       }),
      CSS: PropTypes.object,
      children: PropTypes.array
    })
  ),
  /** setBoard function use to update the board */
  setBoard: PropTypes.func
}