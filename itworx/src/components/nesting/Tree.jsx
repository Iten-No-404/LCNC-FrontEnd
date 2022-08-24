import "../../App.css";
import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import TreeNode from "./TreeNode";

function Tree({ data, droppableId = "board", droppableClass = "Board", type = "board", fontChange = false, parentId= "board", ClassN=null }) {
    return (
        <div style={{ padding: '10px' }}>
            <Droppable droppableId={droppableId} type={type} isCombineEnabled>
                {(provided) => (
                    <div className={droppableClass} {...provided.droppableProps} ref={provided.innerRef}>
                        {data.map(({ id, font, CSS, text, selected, type, children }, index) => {
                            return (
                                <Draggable draggableId={id} key={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div style={{ position: 'relative' }} {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                            <span style={{ background: '#555', position: 'absolute' }} {...provided.dragHandleProps} >
                                                Drag
                                            </span>
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