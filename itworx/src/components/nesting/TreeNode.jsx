import React from 'react'
import "../../App.css";
import Header from "../blocks/Header";
import Section from "../blocks/Section";
import DisplayImage from '../blocks/Image';
import Nav from '../blocks/Nav';
import Div from '../blocks/Div';
import blocksType from "../../helper/blocksType"
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
        return "1px solid blue";
    } else if(parentId[1] === '1') {
        return "1px dashed red";
    } else if(parentId[1] === '2') {
        return "1px dashed blue";
    } else if(parentId[1] === '3') {
        return "1px dotted red";
    } else if(parentId[1] === '4' ) {
        return "1px dotted blue";
    } else if(parentId[1] === '5') {
        return "1px groove red";
    } else if(parentId[1] === '6') {
        return "1px groove blue";
    }
}

function TreeNode({ id, index, font, CSS, text, selected=false, type, childs, parentId, ClassN=null }) {
    return (
        <Droppable droppableId={getDroppableId(id, parentId)} type={getDragType(parentId)} isCombineEnabled >
            {(provided) => (
                <div {...provided.droppableProps} style={{ display: 'block', border: getBorderStyling(parentId), borderColor: '#AAA', marginBottom: "5px"  }} ref={provided.innerRef}>
                    <Draggable draggableId={getDraggableId(id, parentId)} key={id} index={index}>
                        {(provided, snapshot) => (
                            <>
                                <div style={{ border: '5px #0000FF' }} className={(type === blocksType.navbar)? ClassN :"d-flex flex-row"} {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                    <br />
                                    {/* {getDragType(parentId)} */}
                                    {/* <div style={{ background: '#0f0' }}> start</div> */}
                                    {type === blocksType.div &&
                                        (<Div isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS}/>)
                                    }
                                    {type === blocksType.header &&
                                        (<Header isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS}/>)
                                    }
                                    {type === blocksType.section &&
                                        ( <Section isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS}/>)
                                    }
                                    {type === blocksType.image &&
                                        ( <DisplayImage isDragging={snapshot.isDragging} classN="Block" id={id} selectedImage={text} width={ClassN? "300" : "30" }/>)
                                    }
                                    {type === blocksType.navbar &&
                                        (  <Nav isDragging={snapshot.isDragging} classN="Block" id={id} /*children={children}*//>)
                                    }
                                    <div style={{ display: "none" }} {...provided.dragHandleProps} >
                                    </div>
                                    {
                                        childs && childs.length > 0 && (
                                            <Tree data={childs} parentId={parentId} parentType={type} droppableId={getDroppableId(id, getDroppableId(id, parentId))} droppableClass="" type={getDragType(getDragType(parentId))} />
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