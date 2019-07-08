import React from 'react';
import { Query } from 'react-apollo';

/* Our code */
import { getNodeFields } from '../../graphql';
// import Field from '../Fields/Field';

const Label = (props) => {
  let { textX, textY, textSize, ratio } = props.display.attributes;
  const { id, name, centerX, centerY, onClick, nodeTextElement, hasParent, scaleFactor } = props;
  textSize = (ratio ? ratio * textSize : textSize) * 9;
  const fontSize = (textSize ? textSize : 5 * scaleFactor) + 'pt';
  return (
    <React.Fragment>
      <text
        ref={nodeTextElement}
        x={textX || centerX}
        y={textY || centerY}
        textAnchor="middle"
        className={'circletext ' + (! hasParent ? 'shown' : '') + ' ' + (!props.visible ? ' hidden' : 'shown') }
        onClick={onClick}
      >
        <tspan x={textX || centerX} style={{ fontSize }} dy="0em">{name}</tspan>
        <Query query={ getNodeFields } variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error || !data.getNodeFields) return null;
      
            return (
              data.getNodeFields.map(field => (
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
