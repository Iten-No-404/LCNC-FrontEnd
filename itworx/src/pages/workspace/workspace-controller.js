import { useDispatch } from 'react-redux';
import GenerateId from "../../helper/generate-id";
import { setWidget } from "../../states//widget-list-slice//widget-list-slice";
import { useSelector } from "react-redux";
import { selectDefaultCSS } from "../../states/default-css-slice/default-css-slice";
import { selectBlocksList } from '../../states/blocks-list-slice/blocks-list-slice';
import JSZip from "jszip";
import { saveAs } from "file-saver";

const WorkSpaceHandler = (board, setBoard) => {
    const defaultCSS = useSelector(selectDefaultCSS);
    const blocksList = useSelector(selectBlocksList);

    const dispatch = useDispatch();

    const reorder = (result) => {
        const items = Array.from(board);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBoard(items);
        return result;
    };

    const recursiveAddChild = (myBoard, id, item) => {
        if (myBoard && myBoard.length > 0) {
            let newBoard = [];
            myBoard.forEach((block) => {
                if (block.id === id) {
                    const newBlock = { ...block, children: [...block.children, item] };
                    newBoard.push(newBlock);
                } else {
                    const val = recursiveAddChild(block.children, id, item);
                    if (val.length > 0) {
                        const newBlock = { ...block, children: val };
                        newBoard.push(newBlock);
                    } else {
                        newBoard.push(block);
                    }
                }
            });
            return newBoard;
        } else {
            return [];
        }
    };

    //////////////////// Fix this ////////////////////////////
    // Used to add the CSS of the Widget of the retrieved board from the API.
    const recursiveAddCSS = (myBoard) => {
        if (myBoard && myBoard.length > 0) {
            myBoard.forEach((block) => {
                dispatch(
                    setWidget({
                        id: block.id,
                        font: block.CSS.font,
                        CSS: block.CSS,
                    })
                );
                return recursiveAddCSS(block.children);
            });
        }
    };

    let removedItem;
    const recursiveRemoveChild = (myBoard, id) => {
        if (myBoard && myBoard.length > 0) {
            myBoard.forEach((e) => {
                if (e.id === id) {
                    const item = myBoard.find((e) => e.id === id);
                    myBoard.splice(myBoard.indexOf(e), 1);
                    removedItem = item;
                    return;
                } else {
                    recursiveRemoveChild(e.children, id);
                }
            });
        }
    };

    // this is used only when we are nesting a block
    const nest = (board, draggableId, droppableDestination) => {
        if (draggableId.toString().includes("l")) {
            draggableId = draggableId.toString().split("_")[2];
        }
        if (droppableDestination.draggableId.toString().includes("l")) {
            droppableDestination.draggableId = droppableDestination.draggableId.toString().split("_")[2];
        }
        recursiveRemoveChild(board, Number(draggableId), removedItem);
        const boardAfterNesting = recursiveAddChild(board, Number(droppableDestination.draggableId), removedItem);
        return boardAfterNesting;
    };

    // this is used only when we are adding a new nested block to the board
    const copyThenNest = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const item = sourceClone[droppableSource.index - 1];
        const newId = GenerateId();
        dispatch(
            setWidget({
                id: newId,
                font: defaultCSS.font,
                CSS: defaultCSS,
            })
        );
        // find the element with destination id and add the new element to it's children
        const destIndex = destClone.findIndex((e) => e.id === droppableDestination.draggableId);
        destClone[destIndex].children.push({ ...item, id: newId, children: [], CSS: defaultCSS });
        return destClone;
    };

    const recursiveReorder = (myBoard, id, index1, index2) => {
        if (myBoard && myBoard.length > 0) {
            let newBoard = [];
            myBoard.forEach((block) => {
                if (block.id === id) {
                    const children = block.children;
                    const [reorderedItem] = children.splice(index1, 1);
                    children.splice(index2, 0, reorderedItem);
                    const newBlock = { ...block, children: children };
                    newBoard.push(newBlock);
                } else {
                    const val = recursiveReorder(block.children, id, index1, index2);
                    if (val.length > 0) {
                        const newBlock = { ...block, children: val };
                        newBoard.push(newBlock);
                    } else {
                        newBoard.push(block);
                    }
                }
            });
            return newBoard;
        } else {
            return [];
        }
    };

    const copy = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const item = sourceClone[droppableSource.index - 1];

        const newId = GenerateId();
        dispatch(
            setWidget({
                id: newId,
                font: defaultCSS.font,
                CSS: defaultCSS,
            })
        );
        if (item.children) {
            const newchildren = item.children.map((child) => {
                const newId = GenerateId();
                dispatch(
                    setWidget({
                        id: newId,
                        font: defaultCSS.font,
                        CSS: defaultCSS,
                    })
                );
                return { ...child, id: newId, CSS: defaultCSS, children: [] };
            });
            destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS, children: newchildren });
        } else {
            destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS, children: [] });
        }
        return destClone;
    };

    const recursiveDisSelect = (myBoard) => {
        if (myBoard && myBoard.length > 0) {
            let newBoard = [];
            myBoard.forEach((block) => {
                const val = recursiveDisSelect(block.children);
                if (val.length > 0) {
                    const newBlock = { ...block, selected: false, children: val };
                    newBoard.push(newBlock);
                } else {
                    const newBlock = { ...block, selected: false };
                    newBoard.push(newBlock);
                }
            });
            return newBoard;
        } else {
            return [];
        }
    };

    const recursiveGetBlockType = (myBoard, id) => {
        if (myBoard && myBoard.length > 0) {
            for (let i = 0; i < myBoard.length; i++) {
                const block = myBoard[i];
                if (block.id === id) {
                    return block.type;
                } else {
                    const type = recursiveGetBlockType(block.children, id);
                    if (type) return type;
                }
            }
            return "";
        } else {
            return "";
        }
    };

    const handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        // this is the case of nesting a block inside another block
        if (result.combine) {
            // when we are adding a new nested block to the board
            if (source.droppableId === "selectWidgetTab") {
                setBoard((prevBoard) => {
                    if (recursiveGetBlockType(prevBoard, Number(result.combine.draggableId)) === "image") {
                        alert("Can not add widet to image");
                        return prevBoard;
                    }
                    return copyThenNest(blocksList, prevBoard, source, result.combine);
                });
            } else {
                setBoard((prevBoard) => {
                    if (recursiveGetBlockType(prevBoard, Number(result.combine.draggableId)) === "image") {
                        alert("Can not add widet to image");
                        return prevBoard;
                    }
                    return nest(prevBoard, draggableId, result.combine);
                });
            }
            return;
        }
        // dropped outside the list
        if (!destination) {
            return;
        }
        switch (source.droppableId) {
            case destination.droppableId:
                if (source.droppableId === "board") {
                    reorder(result);
                } else {
                    setBoard((prevBoard) => {
                        return recursiveReorder(prevBoard, Number(source.droppableId.split("_")[2]), source.index, destination.index);
                    });
                }
                break;
            case "selectWidgetTab":
                setBoard(copy(blocksList, board, source, destination));
                break;
            default:
                setBoard((prevBoard) => {
                    if (recursiveGetBlockType(prevBoard, Number(result.combine.draggableId)) === "image") {
                        alert("Can not add widet to image");
                        return prevBoard;
                    }
                    return nest(prevBoard, draggableId, result.combine);
                });
                break;
        }
    };
    const generateCodeZip = (htmlcode, csscode, title) => {
        var zip = new JSZip();

        zip.file("index.html", htmlcode.toString());
        zip.file("style.css", csscode.toString());

        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, `${title}.zip`);
        });
    };

    const generateOneCode = (htmlcode, csscode) => {
        const stylepostion = htmlcode.split('<link href="style.css" rel="stylesheet" />');
        return `${stylepostion[0]} <style>  ${csscode}   </style> ${stylepostion[1]}`;

    };

    return { handleOnDragEnd, recursiveAddCSS, generateCodeZip, generateOneCode, recursiveDisSelect };
};

export default WorkSpaceHandler;