import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import PropTypes from 'prop-types';
import FieldSetView from './FieldSetView';
import {
  fetchFields
} from 'graphql/queries';

export const FieldSet = ({id, type, active, visible, variables, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired
  };

  const [loaded, updateLoaded] = useState(false);

  // Get our fields for the corresponding fieldset.
  const [fetchFieldSet, { loading, called, data }] = useLazyQuery(fetchFields, {
    displayName: `fetchFieldSet ${id}`,
    client: getDataCacheService(),
    variables: {data: {fields: variables.fields}},
    onCompleted: (data) => {
      if (!loaded && data.fetchFields && data.fetchFields.length > 0) {
        updateLoaded(true);
      }
    }
  });

  /**
   * Execute our lazyQuery before rendering.
   */
  useEffect(
    () => {
      if (!loaded && !called && !loading) {
        fetchFieldSet();
      }
    },
    [loaded,called,loading]
  );

  if ( loaded ) {
    return (
      <React.Fragment>
        <FieldSetView
          id={id}
          type={type}
          active={active}
          visible={visible}
          fields={data.fetchFields}
        >
          {children}
        </FieldSetView>
      </React.Fragment>
    );
  }

  return null;
}

export default FieldSet;
