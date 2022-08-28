import { useSelector, useDispatch } from 'react-redux';
import uploadImage from './upload-image-service';
import { selectWidgetCSS } from '../../states//widget-css-slice//widget-css-slice';
import { setWidget } from '../../states//widget-list-slice//widget-list-slice';

const StyleBlockHandler = (setBoard) => {

	const CSS = useSelector(selectWidgetCSS);
	const dispatch = useDispatch();

	const recursiveAddimage = (myBoard, img) => {
		if (myBoard && myBoard.length > 0) {
			console.log("e=",img);
			// console.log("URL.createObjectURL(e.target.files[0])=",URL.createObjectURL(e.target.files[0]));
			let newBoard = [];
			myBoard.forEach(block => {
				if (block.selected) {
					const newBlock = { ...block, text: img };
					newBoard.push(newBlock);
				} else {
					const val = recursiveAddimage(block.children, img);
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

	const handleUploadImage = async (e) => {

		const formData = new FormData();
		formData.append("ImageName", e.target.files[0].name);
		formData.append("Image", e.target.files[0]);
		const res = await uploadImage(formData);
		console.log(res);

		setBoard((prevBoard) => {
			return recursiveAddimage(prevBoard, res);
			// return recursiveAddimage(prevBoard, res.data);
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