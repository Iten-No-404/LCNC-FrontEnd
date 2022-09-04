import "../../App.css";
import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import TreeNode from "../tree-node/tree-node";
import { PropTypes } from "prop-types";

/**
 * iterate over board or childrens of each node and render then 
 */
const Tree = ({ data, droppableId = "board", droppableClass = "Board", type = "board", prentBackground=null, parentType= null, ClassN=null }) =>{
    const isNavBar = (parentType === "navbar")? " d-flex flex-row": " ";
    return (
        <div style={{ padding: '5px' /* For nesting*/ }}>
            <Droppable droppableId={droppableId} type={type} isCombineEnabled>
                {(provided) => (
                    <div style={{backgroundColor: prentBackground }} className={droppableClass + isNavBar} {...provided.droppableProps} ref={provided.innerRef}>                        
                        {data.map(({ id,  CSS, text, selected, type, children , widgetCodeSnippet }, index) => {
                            return (
                                <Draggable draggableId={id} key={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div style={{ position: 'relative' }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={id} >
                                            <TreeNode id={id} index={index} text={text} selected={selected} type={type} childs={children} parentId={droppableId} CSS={CSS} ClassN={ClassN} code1={widgetCodeSnippet.code1} code2={widgetCodeSnippet.code2}/>
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

Tree.propTypes = {
    /** board is have the all widget that is in the project */
   data: PropTypes.arrayOf(
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
   /** to detemente where the block can be drag */
   droppableId: PropTypes.string,
    /** for style */
   droppableClass : PropTypes.string,
   /** type of widget that draw */
   type : PropTypes.string,
    /** background color fot the parent*/
   prentBackground : PropTypes.string,
    /** type parent that draw its children */
   parentType : PropTypes.string,
   /** for style */
   ClassN : PropTypes.string
  }