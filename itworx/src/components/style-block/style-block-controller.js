import { useSelector, useDispatch } from 'react-redux';
import uploadImage from './upload-image-service';
import { selectWidgetCSS } from '../../states//widget-css-slice//widget-css-slice';
import { setWidget } from '../../states//widget-list-slice//widget-list-slice';
import getImage from './get-image-service';

const StyleBlockHandler = (setBoard) => {

	const CSS = useSelector(selectWidgetCSS);
	const dispatch = useDispatch();

	const recursiveAddimage = (myBoard, img) => {
		if (myBoard && myBoard.length > 0) {
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

	const convertDataURIToBinary = (dataURI) => {
		var BASE64_MARKER = ';base64,';
		var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		var base64 = dataURI.substring(base64Index);
		var raw = window.atob(base64);
		var rawLength = raw.length;
		var array = new Uint8Array(new ArrayBuffer(rawLength));
	
		for(var i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	}

	const handleUploadImage = async (e, selectedBlockId, projectId) => {
		console.log("Image", e.target.files[0]);
		const imageNameArr = e.target.files[0].name.split('.');
		// var binaryImg = convertDataURIToBinary(e.target.files[0]);
		// const formData = {
		// 	Image: binaryImg,
		// 	ImageName: selectedBlockId + '.' + imageNameArr[imageNameArr.length-1],
		// 	ImagePath: projectId+'/'
		// };
		const formData = new FormData();
		// console.log(selectedBlockId + '.' + imageNameArr[imageNameArr.length-1]);
		// formData.append("ImageName", e.target.files[0].name);
		formData.append("ImageName", selectedBlockId + '.' + imageNameArr[imageNameArr.length-1]);
		formData.append("ImagePath", projectId+'/');
		formData.append("Image", e.target.files[0]);
		// console.log(formData);
		const res = await uploadImage(formData);
		// console.log(res);

		// const img = await getImage('http://'+res.imagePath);
		// console.log(img);

		setBoard((prevBoard) => {
			return recursiveAddimage(prevBoard, 'http://'+res.imagePath);
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