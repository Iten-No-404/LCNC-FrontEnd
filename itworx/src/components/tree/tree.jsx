import "../../App.css";
import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import TreeNode from "../tree-node/tree-node";

const Tree = ({ data, droppableId = "board", droppableClass = "Board", type = "board", prentBackground=null, parentType= null, ClassN=null }) =>{
    const isNavBar = (parentType === "navbar")? " d-flex flex-row": " ";
    return (
        <div style={{ padding: '5px' /* For nesting*/ }}>
            <Droppable droppableId={droppableId} type={type} isCombineEnabled>
                {(provided) => (
                    <div style={{backgroundColor: prentBackground }} className={droppableClass + isNavBar} {...provided.droppableProps} ref={provided.innerRef}>                        
                        {data.map(({ id, font, CSS, text, selected, type, children }, index) => {
                            return (
                                <Draggable draggableId={id} key={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div style={{ position: 'relative' }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={id} >
                                            <TreeNode id={id} index={index} font={font} text={text} selected={selected} type={type} childs={children} parentId={droppableId} CSS={CSS} ClassN={ClassN}/>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Tree;