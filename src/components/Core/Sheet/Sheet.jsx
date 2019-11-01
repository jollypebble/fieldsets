import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import PropTypes from 'prop-types';
import SheetType from './SheetType';
import {
  fetchFields
} from 'graphql/queries';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

import { useStatus } from 'components/Core/Hooks';

export const Sheet = ({id, type, active, visible, variables, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired
  };
  const [{status, message}, updateStatus] = useStatus();

  // Get our fields for the corresponding fieldset.
  const [fetchSheetFields, { loading, called, data }] = useLazyQuery(fetchFields, {
    client: getDataCacheService(),
    variables: {data: {fields: variables.fields}}
  });

  useLayoutEffect(
    () => {
      fetchSheetFields();
    },
    []
  );

  if ( called && ! loading && data.fetchFields.length > 0) {
    return (
      <SheetType
        id={id}
        type={type}
        active={active}
        visible={visible}
        fields={data.fetchFields}
      >
        {children}
      </SheetType>
    );
  }

  return null;
}

export default Sheet;
