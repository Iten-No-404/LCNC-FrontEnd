import React from 'react'
import "../../App.css";
import Header from "../blocks/header";
import Section from "../blocks/section";
import DisplayImage from '../blocks/image';
import Nav from '../blocks/nav';
import Div from '../blocks/div';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tree from '../tree/tree';
import TreeNodeHandler from './tree-node-controller';

const TreeNode = ({ id, index, font, CSS, text, selected = false, type, childs, parentId, ClassN = null }) => {
    const { getDroppableId, getDraggableId, getDragType, getBorderStyling } = TreeNodeHandler();
    return (
        <Droppable droppableId={getDroppableId(id, parentId)} type={getDragType(parentId)} isCombineEnabled >
            {(provided) => (
                <div {...provided.droppableProps} style={{ display: 'block', border: getBorderStyling(parentId), marginBottom: "5px" }} ref={provided.innerRef}>
                    <Draggable draggableId={getDraggableId(id, parentId)} key={id} index={index}>
                        {(provided, snapshot) => (
                            <>
                                <div style={{ border: '5px #0000FF' }} {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                    {type === "div" &&
                                        (<Div isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS} />)
                                    }
                                    {type === "header" &&
                                        (<Header isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS} />)
                                    }
                                    {type === "section" &&
                                        (<Section isDragging={snapshot.isDragging} classN="Block" text={text} id={id} font={font} CSS={CSS} />)
                                    }
                                    {type === "image" &&
                                        (<DisplayImage isDragging={snapshot.isDragging} classN="Block" id={id} selectedImage={text} CSS={CSS} />)
                                    }
                                    {type === "navbar" &&
                                        (<Nav isDragging={snapshot.isDragging} classN="Block" id={id} /*children={children}*/ />)
                                    }
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