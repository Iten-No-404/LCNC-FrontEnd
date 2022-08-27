import React from 'react'
import "../../App.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tree from '../tree/tree';
import TreeNodeHandler from './tree-node-controller';
import GeneralCodeBlock from "../blocks/general-code-block"

const TreeNode = ({ id, index, font, CSS, text, selected = false, type, childs, parentId, code1 , code2 }) => {
    const { getDroppableId, getDraggableId, getDragType, getBorderStyling } = TreeNodeHandler();
    return (
        <Droppable droppableId={getDroppableId(id, parentId)} type={getDragType(parentId)} isCombineEnabled >
            {(provided) => (
                <div {...provided.droppableProps} style={{ display: 'block', border: getBorderStyling(parentId), marginBottom: "5px" }} ref={provided.innerRef}>
                    <Draggable draggableId={getDraggableId(id, parentId)} key={id} index={index}>
                        {(provided, snapshot) => (
                            <>
                                <div style={{ border: '5px #0000FF' }} {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                    
                                    <GeneralCodeBlock isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS} code1={code1} code2={code2}/>
                                    
                                    <div style={{ display: "none" }} {...provided.dragHandleProps} >
                                    </div>
                                    {
                                        childs && childs.length > 0 && (
                                            <Tree data={childs} prentBackground={CSS.background.color}  parentType={type} droppableId={getDroppableId(id, getDroppableId(id, parentId))} droppableClass="" type={getDragType(getDragType(parentId))} />
                                        )
                                    }
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