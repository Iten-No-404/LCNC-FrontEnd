import React from 'react'
import "../App.css";
import Header from "./blocks/Header";
import blocksType from "../helper/blocksType"
import Section from "./blocks/Section";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tree from './Tree';


const getDroppableId = (id, parentId) => {
    if (parentId[0] !== 'l') {
        return 'l1_drop_' + id;
    } else {
        return `l${Number(parentId[1])+1}_drop_${id}`;
    }
}

const getDraggableId = (id, parentId) => {
    if (parentId[0] !== 'l') {
        return 'l1_drag_' + id;
    } else {
        return `l${Number(parentId[1])+1}_drag_${id}`;
    }
}

const getDragType = (parentId) => {
    if (parentId[0] !== 'l') {
        return 'l1';
    } else {
        return `l${Number(parentId[1])+1}`;
    }
}

export const getBorderStyling = (parentId) => {
    if (parentId[0] !== 'l') {
        return "3px solid blue";
    } else if(parentId[1] === '1') {
        return "3px dashed red";
    } else if(parentId[1] === '2') {
        return "3px dashed blue";
    } else if(parentId[1] === '3') {
        return "3px dotted red";
    } else if(parentId[1] === '4' ) {
        return "3px dotted blue";
    } else if(parentId[1] === '5') {
        return "3px groove red";
    } else if(parentId[1] === '6') {
        return "3px groove blue";
    }
}

function TreeNode({ id, index, font, selected, type, childs, parentId }) {
    return (
        <Droppable droppableId={getDroppableId(id, parentId)} type={getDragType(parentId)} isCombineEnabled >
            {(provided) => (
                <div {...provided.droppableProps} style={{ display: 'block', padding: '10px', border: getBorderStyling(parentId), borderColor: 'black', marginBottom: "5px"  }} ref={provided.innerRef}>
                    <Draggable draggableId={getDraggableId(id, parentId)} key={id} index={index}>
                        {(provided, snapshot) => (
                            <>
                                <div style={{ border: '5px #0000FF' }} {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                    <br />
                                    {/* {getDragType(parentId)} */}
                                    {/* <div style={{ background: '#0f0' }}> start</div> */}
                                    {
                                        type === blocksType.header &&
                                        (<Header isDragging={snapshot.isDragging} classN="block" text={id} id={id} font={font} />)
                                    }
                                    {type === blocksType.section &&
                                        (<Section isDragging={snapshot.isDragging} classN="block" text={id} id={id} font={font} />)
                                    }
                                    <div style={{ display: "none" }} {...provided.dragHandleProps} >
                                    </div>
                                    {
                                        childs && childs.length > 0 && (
                                            <Tree data={childs} parentId={parentId} droppableId={getDroppableId(id, getDroppableId(id, parentId))} droppableClass="" type={getDragType(getDragType(parentId))} />
                                        )
                                    }
                                    {/* <div style={{ background: '#f00' }}> end</div> */}
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

export default TreeNode