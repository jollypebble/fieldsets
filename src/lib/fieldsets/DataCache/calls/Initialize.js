import { Fetch, Update, Defaults } from 'lib/fieldsets/DataCache/calls';
import {
  fetchFieldSet,
  fetchMeta,
  fetchField
} from 'lib/fieldsets/graphql/queries';
import * as DefaultData from 'data/defaults';

/**
 * Iterate through prop defaults json.
 */
const setDataDefaults = ({id, type}) => {
  if (id && type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    // This doesn't fix camel case.
    const idKey = id.charAt(0).toUpperCase() + id.slice(1);
    const typeKey = type.charAt(0).toUpperCase() + type.slice(1) + 'Data';
    // Check for data in Diagrams & Interfaces.
    if ( idKey in DefaultData && typeKey in DefaultData[idKey] ) {
      return DefaultData[idKey][typeKey];
    }
  }
  return {};
}

/**
 * Our Set Utility function
 */
export const Initialize = ( call ) => {
  const id = call.id;
  const key = call.key;
  const defaults = (call.defaults) ? call.defaults : {};
  switch (call.target) {
    // Initialize using the call id
    case 'Diagram':
    case 'diagram':
      // Get default data for the call diagram type which the defaults are stored as the call id.
      const setData = setDataDefaults( { id: id, type: 'set' } );
      // Field values will be updated in the default function from our last local store write.
      const fieldData = setDataDefaults( { id: id, type: 'field' } );
      const metaData = setDataDefaults( { id: id, type: 'meta' } );
      const meta = { ...call.meta, setview: id, __typename: 'Meta' };
      const name = call.name;

      // Write our diagram fieldset as a special type.
      // Write our container fieldset that called this init
      const fieldset = Defaults(
        {id: key, target: 'diagram', defaults: defaults},
        {id: key, name: name, type: 'diagram', parent: 'container', meta: meta }
      );

      initializeFieldSets( { id: key, container: 'diagram', data: { sets: setData, fields: fieldData, meta: metaData, defaults: defaults } } );

      // Our fragments have all been written. Refetch fragment to return as a result and update the root query.
      const diagram = Fetch({id: key, target: 'diagram'});

      return diagram;
    case 'Interface':
    case 'interface':
      return;
    default:
      return;
  }
}

/**
 * Initialize and write all the fragments we will use to query our application
 */
export const initializeFieldSets = ({ id, container = 'container', data }) => {
  const sets = data.sets;
  const fields = data.fields;
  const meta = data.meta;
  const defaults = data.defaults;
  initializeSetData( { id, container, data: sets, defaults: defaults });
  initializeFieldData( { id, container, data: fields, defaults: defaults });
  initializeMetaData( { data: meta, defaults: defaults } );
}

export const initializeSetData = ({ id, container = 'container', data = [], defaults = {} }) => {
  data.map((set) => {
    if ( set.id ) {
      // Check if the fragment exists already
      const setID = set.id;

      // Write the defaults
      set.fields = (set.fields && set.fields.length) ? set.fields : [];
      let setFragment = Defaults({id: setID, target: 'fieldset', defaults: defaults}, {...set});

      // Iterating over children appends the id to our array, so we can set our array to empty.
      setFragment.children = [];

      // Write the fragment
      Update({id: setID, target: 'fieldset'}, {...setFragment});

      // Write our child fragments.
      if (set.children && set.children.length) {
        const children = [...set.children];
        initializeSetData({id, container, defaults, data: [...set.children] });
      }

      // Now append this set to the parent fieldset list
      // Write our fieldset & set relationships
      if (set.parent && set.parent.length) {
        Update({id: set.parent, target: 'fieldset', filter: 'children'}, setID);
      }

      // Add all set ids to the container that initialized
      if (id) {
        Update({id: id, target: container, filter: 'children'}, setID);
      }
    }
  });
}

export const initializeFieldData = ({ id, container = 'container', data = [], defaults = {} }) => {
  if (!data.length) return;
  // Get your fields here. This is defined as a static json, but could be modified here to get remote field type definitions.
  data.map((field) => {
    if (field.id) {
      const fieldID = field.id;
      const fieldFragment = Defaults( {id: fieldID, target: 'field', defaults: defaults}, {...field} );
      Update({id: fieldID, target: 'field'}, { ...fieldFragment });

      // Field parents are arrays as a fields can belong to multiple sets.
      // Make sure we push to the top level id that was initialized as well, but don't classify it as a parent fieldset to the field.
      field.fieldsets = (field.fieldsets) ? [...field.fieldsets] : [];
      for ( let fieldSetID of field.fieldsets ) {
        Update({id: fieldSetID, target: 'fieldset', filter: 'fields'}, fieldID);
      }

      if (id) {
        Update({id: id, target: container, filter: 'fields'}, fieldID);
      }
    }
  });
}

export const initializeMetaData = ({ data = [], defaults }) => {
  data.map((meta) => {
    if (meta.id) {
      const metaID = meta.id;

      // We default to populating fieldsets here if it's not specified in the default data files.
      if (! meta.type) {
        meta.type = 'fieldset'
      }
      const metatype = meta.type;

      const metaFragment = Defaults( {id: metaID, target: 'meta', defaults: defaults}, {...meta} );
      Update({id: metaID, target: 'meta', type: metatype}, {...metaFragment});
    }
  });
}
