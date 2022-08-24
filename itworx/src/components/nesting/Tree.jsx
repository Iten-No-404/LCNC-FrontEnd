import "../../App.css";
import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import TreeNode from "./TreeNode";
import blocksType from "../../helper/blocksType"

function Tree({ data, droppableId = "board", droppableClass = "Board", type = "board", fontChange = false, parentId= "board", parentType= null, ClassN=null }) {
    const isNavBar = (parentType === blocksType.navbar)? " d-flex flex-row": " ";
    console.log(isNavBar);
    return (
        <div style={{ padding: '10px' /* For nesting*/ }}>
            <Droppable droppableId={droppableId} type={type} isCombineEnabled>
                {(provided) => (
                    <div className={droppableClass + isNavBar} {...provided.droppableProps} ref={provided.innerRef}>
                        
                        {data.map(({ id, font, CSS, text, selected, type, children }, index) => {
                            return (
                                <Draggable draggableId={id} key={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div style={{ position: 'relative' }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={id} >
                                            {/* <span style={{ background: '#AAA', position: 'absolute' }} {...provided.dragHandleProps} >
                                                +
                                            </span> */}
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