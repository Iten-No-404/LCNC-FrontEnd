import React from 'react'
import "../App.css";
import Header from "./blocks/Header";
import blocksType from "../helper/blocksType"
import Section from "./blocks/Section";
import { Droppable, Draggable } from "react-beautiful-dnd";

function NestedItem({ id, index, font, selected, type, snapshot, dragType, childs }) {
    return (
        <Droppable droppableId={'l1_drop_' + id} type={dragType} isCombineEnabled >
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Draggable draggableId={'l1_drag_' + id} key={id} index={index}>
                        {(provided, snapshot) => (
                            <>
                                <div {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                    {type === blocksType.header &&
                                        (<Header isDragging={snapshot.isDragging} classN="Block" text={id} id={id} font={font} />)
                                    }
                                    {type === blocksType.section &&
                                        (<Section isDragging={snapshot.isDragging} classN="Block" text={id} id={id} font={font} />)
                                    }
                                    <div {...provided.dragHandleProps} >
                                        Inner Drag
                                    </div>
                                </div>
                            </>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default NestedItem