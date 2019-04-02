import { default as DiagramData } from './data/DiagramData';

const findIn = function (array, id) {
	if (!array) return null;
	let i = 0, len = array.length, obj, ret;
	while (i < len) {
		obj = array[i];
		if (obj.id === id) return obj;
		if (obj.children && obj.children.length > 0) ret = findIn(obj.children, id);
		if (ret) return ret;
		ret = null;
		i++;
	}
	return null;
}

const Utils = {
	getChildrenOf(parentID) {
		let ret = findIn(DiagramData, parentID);
		return ret ? ret.children : [];
	}
}

export default Utils;