import React from 'react';

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
          { 'Data: Value' }
        </tspan>
        { id === 'long_term_money' && <tspan y={textY ? textY + 0.2 : centerY + 0.2 } className="refresh-icon">&#xf0e2;</tspan>}
      </text>
    </React.Fragment>
  );
}

export default Label;
