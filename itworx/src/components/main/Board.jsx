import React from "react";
import "../../App.css";
import Header from "../blocks/Header";
import blocksType from "../../helper/blocksType";
import Section from "../blocks/Section";
import DisplayImage from "../blocks/Image";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Nav from "../blocks/Nav";
import Div from "../blocks/Div";

function Board({ board, droppableId, ClassN=null}) {
  // console.log(board);
  return (
    <div>
      <Droppable droppableId={droppableId} isCombineEnabled >
        {(provided, snapshot) => (
          <div className={ClassN? ClassN :"d-flex flex-row"}  {...provided.droppableProps} ref={provided.innerRef}>
            {board.map((block, index) => {
              if (block.type === blocksType.header) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Header isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} CSS={block.CSS}/>
                      </div>
                    )}
                  </Draggable>
                );
                // return (
                //   <Draggable draggableId={block.id} key={block.id} index={index}>
                //     {(provided, snapshot) => (
                //       <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                //         <Droppable droppableId={'id_' + block.id} isCombineEnabled type="x" >
                //           {(provided, snapshot) => (
                //             <div {...provided.droppableProps} ref={provided.innerRef}>
                //               <Draggable draggableId={block.id + 'a'} key={block.id} index={index}>
                //                 {(provided, snapshot) => (
                //                   <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                //                     <Header isDragging={snapshot.isDragging} classN="Block" text={block.id + 'a'} id={'a'} font={block.font} CSS={block.CSS}/>
                //                     {/* <Header isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} CSS={block.CSS}/> */}
                //                   </div>
                //                 )}
                //               </Draggable>
                //               <Draggable draggableId={block.id + 'b'} key={block.id} index={index}>
                //                 {(provided, snapshot) => (
                //                   <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                //                     <Header isDragging={snapshot.isDragging} classN="Block" text={block.id + 'b'} id={'b'} font={block.font} CSS={block.CSS}/>
                //                   </div>
                //                 )}
                //               </Draggable>
                //               {provided.placeholder}
                //             </div>
                //           )}
                //         </Droppable>
                //       </div>
                //     )}
                //   </Draggable>
                // );
              }
              if (block.type === blocksType.section) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Section isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} CSS={block.CSS}/>
                      </div>
                    )}
                  </Draggable>
                );
              }
              if (block.type === blocksType.image) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <DisplayImage isDragging={snapshot.isDragging} classN="Block" id={block.id} selectedImage={block.text} width={ClassN? "300" : "30" }/>
                      </div>
                    )}
                  </Draggable>
                );
              }
              if (block.type === blocksType.navbar) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Nav isDragging={snapshot.isDragging} classN="Block" id={block.id} children={block.children}/>
                      </div>
                    )}
                  </Draggable>
                );
              }
              if (block.type === blocksType.div) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Div isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} CSS={block.CSS}/>
                      </div>
                    )}
                  </Draggable>
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Board;