const TreeNodeHandler = () => {

	const getDroppableId = (id, parentId) => {
		if (parentId[0] !== 'l') {
			return 'l1_drop_' + id;
		} else {
			return `l${Number(parentId[1]) + 1}_drop_${id}`;
		}
	}

	const getDraggableId = (id, parentId) => {
		if (parentId[0] !== 'l') {
			return 'l1_drag_' + id;
		} else {
			return `l${Number(parentId[1]) + 1}_drag_${id}`;
		}
	}

	const getDragType = (parentId) => {
		if (parentId[0] !== 'l') {
			return 'l1';
		} else {
			return `l${Number(parentId[1]) + 1}`;
		}
	}

	const getBorderStyling = (parentId) => {
		if (parentId[0] !== 'l') {
			return "1px solid #aaa";
		} else if (parentId[1] === '2') {
			return "1px dashed #aaa";
		} else if (parentId[1] === '4') {
			return "1px dotted #aaa";
		} else if (parentId[1] === '6') {
			return "1px groove #aaa";
		}else{
			return "1px groove #aaa";
		}
	}
	return { getDroppableId, getDraggableId, getDragType, getBorderStyling }
}

export default TreeNodeHandler;