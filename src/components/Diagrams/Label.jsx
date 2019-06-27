import React from 'react';
import { Query } from 'react-apollo';

/* Our code */
import { getNodeFields } from '../../graphql';
import Field from '../Fields/Field';

const Label = (props) => {
  let { textX, textY, textSize, ratio } = props.display.attributes;
  const {id, name, centerX, centerY, onClick, nodeTextElement, hasParent, scaleFactor} = props;
  textSize = (ratio ? ratio * textSize : textSize) * 9;
  const fontSize = (textSize ? textSize : 5 * scaleFactor) + 'pt';
  return (
    <React.Fragment>
      <text
        ref={nodeTextElement}
        x={textX ? textX : centerX}
        y={textY ? textY : centerY}
        textAnchor="middle"
        className={'circletext ' + (! hasParent ? 'shown' : '') + ' ' + (!props.visible ? ' hidden' : 'shown') }
        onClick={onClick}
      >
        <tspan x={textX ? textX : centerX} style={{ fontSize }} dy="0em">{name}</tspan>
        <Query query={getNodeFields} variables={{ id }} >
         {({ loading, error, data }) => {
           if (loading) return null;
           if (error) return `Error! ${error}`;
           let fieldlist = [];
           let order = 0;
           console.log(data);
           if (data.getNodeFields) {
             for (let i=0; i<data.getNodeFields.length; i++) {
               if ( data.getNodeFields[i].alwaysDisplay ) {
                 order = data.getNodeFields[i].order;
                 const fieldname = data.getNodeFields[i].name;
                 const value = data.getNodeFields[i].value;

                 fieldlist[order] =
                  <tspan
                    key={data.getNodeFields[i].id}
                    x={textX ? textX : centerX}
                    style={{ fontSize }}
                    dy="1.6em">
                    {(fieldname.length)?`${fieldname}: ${value}`: `${value}`}
                   </tspan>;
                }
             }
           }
           return(fieldlist);
          }}
         </Query>
      </text>
    </React.Fragment>
  );
}

export default Label;
