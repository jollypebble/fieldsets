import SetViewDefaults from 'data/defaults/Sets';
const _ = require('lodash');

/**
 * Return object1, backfiled with all object2 vaules that aren't declared in object1.
 * Iterates through sub objects.
 * @param object. ${object}. An object we will clone.
 * @param object. ${defaults}. The default values for the object to backfill.
 */
const mergeObjectParams = ( object, defaults ) => {
	const backfilled = _.defaultsDeep( _.cloneDeep(object), defaults );
	if ( backfilled.meta ) {
		if ( backfilled.meta.view ) {
			const view = backfilled.meta.view.charAt(0).toUpperCase() + backfilled.meta.view.slice(1);
			const viewDefaults = SetViewDefaults[view];
			if ( ! backfilled.meta.attributes ) {
				backfilled.meta.attributes = {};
			}
			backfilled.meta.attributes = _.defaultsDeep( backfilled.meta.attributes, viewDefaults );
		}
	}
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
	backfillSetData(data, defaults, skipdepth = false) {
		// Backfill default data structures.
		let backfill = [];
		_.forEach( data, (obj, index) => {
			backfill[index] = mergeObjectParams(obj,defaults);
			if (!(_.isEmpty(obj.children))) {
				backfill[index].children = this.backfillSetData(obj.children, defaults, true);
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
	},
	isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
			}
    }
    return true;
	}
}

export default DataUtils;
