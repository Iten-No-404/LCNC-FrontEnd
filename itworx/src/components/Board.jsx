// import React from "react";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import NestedItem from "./NestedItem";
// import "../App.css";

// function Board({ board, setBoard, fontChange = false }) {
//   return (
//     <div>
//       <Droppable droppableId="board" isCombineEnabled>
//         {(provided) => (
//           <div className="Board"  {...provided.droppableProps} ref={provided.innerRef}>
//             {board.map(({ id, font, selected, type }, index) => {
//               return (
//                 <Draggable draggableId={id} key={id} index={index}>
//                   {(provided, snapshot) => (
//                     <div {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
//                       <NestedItem dragType='l1' snapshot={snapshot} id={id} index={index} font={font} selected={selected} type={type} />
//                       <div style={{ background: '#666' }} {...provided.dragHandleProps} >
//                         Outer Drag
//                       </div>
//                     </div>
//                   )}
//                 </Draggable>
//               );
//             })}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }

// export default Board;