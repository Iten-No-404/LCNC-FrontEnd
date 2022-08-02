import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import "../App.css";
import Header from "./blocks/Header";
import blocksType from "../helper/blocksType"
import Section from "./blocks/Section";
import BlocksList from "../helper/BlocksList";
import GenerateId from "../helper/GenerateId";
import { defaultFont } from "../helper/InitialFont";
import { setWidget } from "../states/WidgetCSSSlice/WidgetCSSSlice";

function Board({ board, setBoard, fontChange=false }) {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item) => addBlockToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addBlockToBoard = (id) => {   
    if (!board.find((block) => block.id === id)) {
      const newId = GenerateId();
      const block = BlocksList.find((block) => id === block.id);
      setBoard((board) => [...board, { ...block, id :newId, onBoard: true, font: defaultFont }]);
      dispatch(setWidget({
        id: newId,
        font: defaultFont
      }));
    }
  };
  return (
    <>
      <div className="Board" ref={drop}>
        {board.map((block) => {
          if (block.type === blocksType.header) {
            return (<div key={block.id} className={block.selected ? "SelectedBlock" : ""}>
              <Header classN="Block" text={block.text} id={block.id} font={block.font} />
            </div>);
          }
          if (block.type === blocksType.section) {
            return (<div key={block.id} className={block.selected ? "SelectedBlock" : ""}>
              <Section classN="Block" text={block.text} id={block.id} font={block.font} />
            </div>);
          }
        })}
      </div>
    </>
  );
}

export default Board;