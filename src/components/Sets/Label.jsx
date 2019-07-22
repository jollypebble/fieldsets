import React from 'react';
import { Query } from 'react-apollo';

/* Our code */
import { getSetFields } from '../../graphql';
// import Field from '../Fields/Field';

const array = ['net_worth_total', 'monthly_contribution_total', 'lump_sums_total'];

const Label = (props) => {
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
        <Query query={ getSetFields } variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error || !data.getSetFields) return null;

            return (
              data.getSetFields.map((field, index) => (
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
