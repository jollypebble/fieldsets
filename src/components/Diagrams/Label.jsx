import React from 'react';

const noValueList = ['monthly_contribution', 'lump_sums', 'short_term_money', 'mid_term_money', 'long_term_money'];

const Label = (props) => {
  let { textX, textY, textSize, ratio } = props.display.attributes;
  const {id, name, centerX, centerY, focusCircle, nodeTextElement, hasParent, scaleFactor} = props;
  textSize = (ratio ? ratio * textSize : textSize) * 0.9;
  const fontSize = (textSize ? textSize : 0.5 * scaleFactor) + 'pt';
  return (
    <React.Fragment>
      <text
        ref={nodeTextElement}
        x={textX ? textX : centerX}
        y={textY ? textY : centerY}
        textAnchor="middle"
        className={'circletext ' + (! hasParent ? 'shown' : '') + ' ' + (!props.visible ? ' hidden' : 'shown') }
        onClick={focusCircle}
      >
        <tspan x={textX ? textX : centerX} style={{ fontSize }} dy="0em">{name}</tspan>
        <tspan x={textX ? textX : centerX} style={{ fontSize }} dy="1.6em">
          { !noValueList.includes(id) && 'Data: Value' }
        </tspan>
      </text>
    </React.Fragment>
  );
}

export default Label;
