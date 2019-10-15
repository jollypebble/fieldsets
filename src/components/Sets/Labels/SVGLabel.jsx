import React, { useEffect, useState } from 'react';
import { Query } from 'react-apollo';

/* Our code */
import { fetchFields } from 'graphql/queries';

const array = ['net_worth_total', 'monthly_contribution_total', 'lump_sums_total'];

const SVGLabel = ({id, className, name, active, visible, variables}) => {
  // If no label has been set don't render;
  if (! name ) return null;

  const defaults = {
    ratio: 1.2,
    textSize: 0.45,
    radius: 80
  }

  const center = variables.center;
  let { width, height, ratio, textSize, radius, textX, textY } = {...defaults, ...variables.attributes};

  const centerX = center.x;
  const centerY = center.y;

  textX = (textX) ? textX : centerX;
  textY = (textY) ? textY : centerY;

  textSize = (ratio ? ratio * textSize : textSize) * 9;

  const fontSize = (textSize ? textSize : 5 * variables.zoom.scale) + 'pt';
  let titleFontSize = (textSize ? textSize * 1.05 : 5.5 * variables.zoom.scale) + 'pt';
  if (array.includes(`${id}_total`)) titleFontSize = textSize * 0.9 + 'pt';

  const visibleClass = visible ? 'shown' : 'hidden';

  return (
    <React.Fragment>
      <text
        x={textX}
        y={textY}
        textAnchor="middle"
        className={`${variables.setview}-text ${visibleClass}`}
      >
        <tspan
          x={textX}
          style={{ fontSize, fontWeight: 'bold', textTransform: 'uppercase' }}
          dy="0em"
          className={`setview-${variables.setview}-legend ${id}-legend`}
        >
            {name}
        </tspan>
        <Query query={ fetchFields } variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error || !data.fetchFields) return null;

            return (
              data.fetchFields.map((field, index) => (
                field.alwaysDisplay &&
                <tspan
                  key={field.id}
                  x={textX}
                  dy={index === 0 && !array.includes(field.id) ? '2em' : array.includes(field.id) ? '1.6em' : '1.4em'}>
                  {(field.name) ? `${field.name} : ${field.value}` : `Value : ${field.value}`}
                </tspan>
            )));
            }}
         </Query>
      </text>
    </React.Fragment>
  );
}

export default SVGLabel;
