import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const SetGroup = React.lazy(() => import('lib/fieldsets/Set/SetGroup'));
const Set = React.lazy(() => import('lib/fieldsets/Set/Set'));


/**
 * Sets are state data components that represent groupings of field data and a users interactions with that data.
 * Each set will check its own field set data and will iteratively call itself if there are children.
 */

const SubSet = ({ id, data }) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object
  };

  return (
      <Suspense>
        <SetGroup
          id={`${id}`}
          key={`${id}-children`}
          type={data.type}
          group={'children'}
          view={data.meta.data.view}
          className={`view-${data.meta.data.view} set-children ${id}-group`}
        >
          {
            data.children.map((fieldsetID) => {
              console.log(fieldsetID)
              return(
                <Set
                  id={ fieldsetID }
                  key={ `${fieldsetID}` }
                />
              )
            })
          }
        </SetGroup>
      </Suspense>
  );
}

export default SubSet;
