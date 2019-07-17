import React from 'react';
import { Query } from 'react-apollo';

/* Our code */
import { getSetFields } from '../../graphql';
// import Field from '../Fields/Field';

const Label = (props) => {
  let { textX, textY, textSize, ratio } = props.display.attributes;
  const { id, name, centerX, centerY, onClick, updateTextElement, hasParent, scaleFactor } = props;
  textSize = (ratio ? ratio * textSize : textSize) * 9;
  const fontSize = (textSize ? textSize : 5 * scaleFactor) + 'pt';
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
        <tspan x={textX || centerX} style={{ fontSize }} dy="0em">{name}</tspan>
        <Query query={ getSetFields } variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error || !data.getSetFields) return null;

            return (
              data.getSetFields.map(field => (
                field.alwaysDisplay && <tspan
                  key={field.id}
                  x={textX || centerX}
                  style={{ fontSize }}
                  dy="1.6em">
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
