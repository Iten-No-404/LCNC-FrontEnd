import React from 'react'
import "../../App.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tree from '../tree/tree';
import TreeNodeHandler from './tree-node-controller';
import GeneralCodeBlock from "../blocks/general-code-block"
import { PropTypes } from "prop-types";

/**
 * to render each childern the call TreeNode to render its children if exist
 */
const TreeNode = ({ id, index, CSS, text, selected = false, type, childs, parentId, code1 , code2 }) => {
    const { getDroppableId, getDraggableId, getDragType, getBorderStyling } = TreeNodeHandler();
    return (
        <Droppable droppableId={getDroppableId(id, parentId)} type={getDragType(parentId)} isCombineEnabled >
            {(provided) => (
                <div {...provided.droppableProps} style={{ display: 'block', border: getBorderStyling(parentId), marginBottom: "5px" }} ref={provided.innerRef}>
                    <Draggable draggableId={getDraggableId(id, parentId)} key={id} index={index}>
                        {(provided, snapshot) => (
                            <>
                                <div style={{ border: '5px #0000FF' }} {...provided.draggableProps} ref={provided.innerRef} key={id} className={selected ? "SelectedBlock" : ""}>
                                    
                                    <GeneralCodeBlock isDragging={snapshot.isDragging} classN="Block" text={text} CSS={CSS} code1={code1} code2={code2}/>
                                    
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

TreeNode.propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    /** array have all widget children */
    childs: PropTypes.arrayOf(
     PropTypes.shape({
       id: PropTypes.number,
       type:  PropTypes.string,
       text: PropTypes.string,
       selected: PropTypes.bool,
       widgetCodeSnippet: PropTypes.shape({
        code1: PropTypes.string,
        code2:  PropTypes.string,
       }),
       CSS: PropTypes.object,
       children: PropTypes.array
     })
   ),
   /** open tage for the widget */
   code1: PropTypes.string,
    /** close tage for the widget */
   code2 : PropTypes.string,
   /** widget defult text */
   text : PropTypes.string,
   /** type of widget*/
   type : PropTypes.string,
   /** widget parent */
    parentId : PropTypes.string,
   /** check if the widget selected or not */
   selected : PropTypes.bool,
    /** style for the widget */
   CSS: PropTypes.object
  }