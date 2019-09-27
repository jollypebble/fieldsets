import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import DataCacheDefault from 'components/Core/DataCache/DataCacheDefault';
import { fragmentDefaults } from 'graphql/fragments/defaults';
import {
  fetchFieldSet,
  fetchMeta,
  fetchField
} from 'graphql/queries';

/**
 * Our Set Utility function
 */
export const Initialize = ( call ) => {
  const id = call.id;
  const key = call.key;
  switch (call.target) {
    // Initialize using the call id
    case 'diagram':
      // Get default data for the call diagram type which the defaults are stored as the call id.
      // TODO: Check localforage for a saved state and use that instead of defaults.
      const setData = DataCacheDefault( { id: id, type: 'set' } );
      const fieldData = DataCacheDefault( { id: id, type: 'field' } );
      const metaData = DataCacheDefault( { id: id, type: 'meta' } );
      const meta = { ...call.meta, setview: id };
      const name = call.name;

      // Write our diagram fieldset as a special type.
      // Write our container fieldset that called this init
      const fieldset = callCache(
        {id: key, action: 'defaults', target: 'diagram'},
        {id: key, name: name, type: 'diagram', parent: 'container', meta:meta }
      );

      initializeFieldSets( { id: key, container: 'diagram', data: { sets: setData, fields: fieldData, meta: metaData } } );

      // Our fragments have all been written. Refetch fragment to return as a result and update the root query.
      const diagram = callCache({id: key, target: 'diagram', action: 'fetch'});

      return diagram;
    case 'interface':
      return;
    case 'sheet':
      return;
    default:
      return;
  }
}

/**
 * Initialize and write all the fragments we will use to query our application
 */
export const initializeFieldSets = ({ id, container = 'container', data = [] }) => {
  const client = getDataCacheService();

  const sets = data.sets;
  const fields = data.fields;
  const meta = data.meta;

  // Initialize Fields first as this will initialize all of our field sets.
  initializeFieldData( { id, container, data: fields });
  initializeSetData( { id, container, data: sets });
  initializeMetaData( { data: meta } );
}

export const initializeSetData = ({ id, container = 'container', data = [] }) => {
  const client = getDataCacheService();
  data.map((set) => {
    if ( set.id ) {
      // Check if the fragment exists already
      const setID = set.id;

      // Write the defaults
      let setFragment = callCache({id: setID, action: 'defaults', target: 'fieldset'},set);

      // Write the fragment
      set = callCache({id: setID, target: 'fieldset', action: 'update'}, setFragment);
      // Write our child fragments.
      if (set.children.length) {
        initializeSetData({id, container, data: set.children});
      }

      // Now append this set to the parent fieldset list
      // Write our fieldset & set relationships
      if (set.parent.length) {
        callCache({id: set.parent, target: 'fieldset', action: 'update', filter: 'children'}, set.id);
      }

      // Add all set ids to the container that initialized
      if (id) {
        callCache({id: id, target: container, action: 'update', filter: 'children'}, set.id);
      }
    }
  });
}

export const initializeFieldData = ({ id, container = 'container', data = [] }) => {
  if (!data.length) return;

  const client = getDataCacheService();
  // Get your fields here. This is defined as a static json, but could be modified here to get remote field type definitions.
  data.map((field) => {
    if (field.id) {
      const fieldID = field.id;
      const fieldFragment = callCache( {id: fieldID, action: 'defaults', target: 'field'}, field );

      field = callCache({id: fieldID, target: 'field', action: 'update'}, fieldFragment);

      // Field parents are arrays as a fields can belong to multiple sets.
      // Make sure we push to the top level id that was initialized as well, but don't classify it as a parent fieldset to the field.
      for ( let fieldSetID of field.sets ) {
        callCache({id: fieldSetID, target: 'fieldset', action: 'update', filter: 'fields'}, field.id);
      }

      if (id) {
        callCache({id: id, target: container, action: 'update', filter: 'fields'}, field.id);
      }
    }
  });
}

export const initializeMetaData = ({ data = [] }) => {

  const client = getDataCacheService();
  data.map((meta) => {
    if (meta.id) {
      const metaID = meta.id;

      // We default to populating fieldsets here if it's not specified in the default data files.
      if (! meta.type) {
        meta.type = 'fieldset'
      }
      const metatype = meta.type;

      const metaFragment = callCache( {id: metaID, action: 'defaults', target: 'meta'}, meta );

      callCache({id: metaID, target: 'meta', type: metatype, action: 'update'}, metaFragment);
    }
  });
}
