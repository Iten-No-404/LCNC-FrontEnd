import { useSelector, useDispatch } from 'react-redux';
import { selectWidgetCSS } from '../../states//widget-css-slice//widget-css-slice';
import { setWidget } from '../../states//widget-list-slice//widget-list-slice';

const StyleBlockHandler = (setBoard) => {

	const CSS = useSelector(selectWidgetCSS);
	const dispatch = useDispatch();

	const recursiveAddimage = (myBoard, e) => {
		if (myBoard && myBoard.length > 0) {
			let newBoard = [];
			myBoard.forEach(block => {
				if (block.selected) {
					const newBlock = { ...block, text: URL.createObjectURL(e.target.files[0]) };
					newBoard.push(newBlock);
				} else {
					const val = recursiveAddimage(block.children, e);
					if (val.length > 0) {
						const newBlock = { ...block, children: val };
						newBoard.push(newBlock);
					} else {
						newBoard.push(block);
					}
				}
			}
			);
			return newBoard;
		} else {
			return [];
		}
	}

	const handleUploadImage = (e) => {
		setBoard((prevBoard) => {
			return recursiveAddimage(prevBoard, e);
		})
	};

	const recursiveChangeCSS = (myBoard) => {
		if (myBoard && myBoard.length > 0) {
			let newBoard = [];
			myBoard.forEach(block => {
				if (block.selected) {
					dispatch(setWidget({
						id: block.id,
						text: CSS.text,
						CSS: CSS
					}));
					const newBlock = { ...block, CSS: CSS };
					newBoard.push(newBlock);
				} else {
					const val = recursiveChangeCSS(block.children);
					if (val.length > 0) {
						const newBlock = { ...block, children: val };
						newBoard.push(newBlock);
					} else {
						newBoard.push(block);
					}
				}
			}
			);
			return newBoard;
		} else {
			return [];
		}
	}
	return {
		handleUploadImage,
		recursiveChangeCSS
	}

}

export default StyleBlockHandler;