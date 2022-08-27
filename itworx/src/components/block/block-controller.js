import { useSelector, useDispatch } from 'react-redux';
import { setCSS } from '../../states/widget-css-slice/widget-css-slice';
import { selectWidgetsList } from '../../states/widget-list-slice/widget-list-slice';
import { PropTypes } from "prop-types";
/**
 * Provide the recursive function fro delete and select widget
 */

const BlockHandler = (setBoard) => {
    const widgetList = useSelector(selectWidgetsList);
    const dispatch = useDispatch();

    const resetChosenCSS = (id) => {
        dispatch(
            setCSS({
                color: widgetList[id].color,
                font: widgetList[id].font,
                text: widgetList[id].text,
                background: widgetList[id].background,
                width: widgetList[id].width,
                height: widgetList[id].height,
                padding: widgetList[id].padding,
                border: widgetList[id].border,
                margin: widgetList[id].margin,
                id: id,
            })
        );
    };

    const recursiveRemoveChild = (myBoard, id) => {
        if (myBoard && myBoard.length > 0) {
            myBoard.forEach((e) => {
                if (e.id === id) {
                    myBoard.splice(myBoard.indexOf(e), 1);
                    return;
                } else {
                    recursiveRemoveChild(e.children, id);
                }
            });
        }
    };

    const recursiveSelect = (myBoard, id) => {
        if (myBoard && myBoard.length > 0) {
            let newBoard = [];
            myBoard.forEach((block) => {
                if (block.id === id) {
                    resetChosenCSS(block.id);
                    const val = recursiveSelect(block.children, id);
                    if (val.length > 0) {
                        const newBlock = { ...block, selected: true, children: val };
                        newBoard.push(newBlock);
                    } else {
                        const newBlock = { ...block, selected: true };
                        newBoard.push(newBlock);
                    }
                } else {
                    const val = recursiveSelect(block.children, id);
                    if (val.length > 0) {
                        const newBlock = { ...block, selected: false, children: val };
                        newBoard.push(newBlock);
                    } else {
                        const newBlock = { ...block, selected: false };
                        newBoard.push(newBlock);
                    }
                }
            });
            return newBoard;
        } else {
            return [];
        }
    };

    const handelSelect = (selindex) => {
        setBoard((prevBoard) => {
            return recursiveSelect(prevBoard, selindex);
        });
    };

    const handelDelete = (selindex) => {
        setBoard((prevBoard) => {
            let newboard = [...prevBoard];
            recursiveRemoveChild(newboard, selindex);
            return newboard;
        });
    };

    return {
        handelSelect,
        handelDelete,
    };
};

export default BlockHandler;

BlockHandler.propTypes = {
    /** setBoard function use to update the board */
    setBoard: PropTypes.func,
};