import ShapeDefaults from '../config/defaults/components/Diagrams/Shapes';
const _ = require('lodash');

/**
 * Return object1, backfiled with all object2 vaules that aren't declared in object1.
 * Iterates through sub objects.
 * @param object. ${object}. An object we will clone.
 * @param object. ${defaults}. The default values for the object to backfill.
 */
const mergeObjectParams = ( object, defaults ) => {
	const backfilled = _.defaultsDeep( _.cloneDeep(object), defaults );
	const shape = backfilled.display.shape.charAt(0).toUpperCase() + backfilled.display.shape.slice(1);
	const shapeDefaults = ShapeDefaults[shape];
	backfilled.display.attributes = _.defaultsDeep( backfilled.display.attributes, shapeDefaults );
	return backfilled;
}

// Depth is used to set heirarchical ordering based on nested children.
const addDepth = (obj, depth = 0) => {
	_.forEach(obj, (value,key) => {
		value.depth = depth;
		// Set our necessary display
		if (!(_.isEmpty(value.children)) && value.children.length > 0) {
			value.children = addDepth(value.children, depth + 1);
		} else {
			value.children = [];
		}
		obj[key] = value;
	});

	return obj;
}

const DataUtils = {
	/**
	 * A wrapper function for parameter merging.
	 */
	backfillDiagramData(data, defaults, skipdepth = false) {
		// Backfill default data structures.
		let backfill = [];
		_.forEach( data, (obj, index) => {
			backfill[index] = mergeObjectParams(obj,defaults);
			if (!(_.isEmpty(obj.children))) {
				backfill[index].children = this.backfillDiagramData(obj.children, defaults, true);
			}
		});

		// Backfill data hiearchy.
		if ( ! skipdepth ) {
			backfill = addDepth(backfill, 0);
		}
		return backfill;
	},
	getParams(obj,defaults) {
		return mergeObjectParams(obj,defaults);
	}
}

export default DataUtils;
