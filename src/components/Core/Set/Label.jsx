import React from 'react';
import { Query } from 'react-apollo';

/* Our code */
import { fetchFields } from 'graphql/queries';

const array = ['net_worth_total', 'monthly_contribution_total', 'lump_sums_total'];

const Label = (props) => {
  // If no label has been set don't render;
  if (! props.display.attributes ) return null;

  let { textX, textY, textSize, ratio } = props.display.attributes;
  const { id, name, centerX, centerY, onClick, updateTextElement, hasParent, scaleFactor } = props;
  textSize = (ratio ? ratio * textSize : textSize) * 9;
  const fontSize = (textSize ? textSize : 5 * scaleFactor) + 'pt';
  let titleFontSize = (textSize ? textSize * 1.05 : 5.5 * scaleFactor) + 'pt';
  if (array.includes(`${id}_total`)) titleFontSize = textSize * 0.9 + 'pt';
  return (
    <React.Fragment>
      <text
        ref={updateTextElement}
        x={textX || centerX}
        y={textY || centerY}
        textAnchor="middle"
        className={'circletext ' + (! hasParent ? 'shown' : '') + ' ' + (!props.visible ? ' hidden' : 'shown') }
        onClick={onClick}
      >
        <tspan x={textX || centerX} style={{ fontSize, fontWeight: 'bold', textTransform: 'uppercase' }} dy="0em">{name}</tspan>
        <Query query={ fetchFields } variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error || !data.fetchFields) return null;

            return (
              data.fetchFields.map((field, index) => (
                field.alwaysDisplay && <tspan
                  key={field.id}
                  x={textX || centerX}
                  style={{ fontSize: titleFontSize }}
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

export default Label;
