import React from 'react';

const Triangle = ({id, visibility, attributes}) => {
  const {radiusX, radiusY, width, height,centerX, centerY, strokeWidth, parentCenterX, parentCenterY, rotate} = attributes;

  // We know the height and width of the traingle. Caculate the edges using Pythagorean's Theorem
  const heightside = Math.sqrt(height*height + (width*width)/2);
  const widthside = width;

  // Midpoint of width/base of triangle
  const unknownX = 2*centerX - parentCenterX;
  const unknownY = 2*centerY - parentCenterY;

  // Calculate slope of line.
  const slope = (unknownY - parentCenterY)/(unknownX - parentCenterX);

 // Draw a perpendicular line using y=mx+b

  // console.log(slope)

  // We also want this triangle around a center point. Calculate the rotation of the triangle base on the angle between the parent and child center points.

  return (
    <React.Fragment>
      <polygon
        id={id}
        points={`${parentCenterX},${parentCenterY} 20,48 34,71`}
        className="circlenode triangle"
        fill="none"
        strokeWidth={strokeWidth ? strokeWidth : 0.1}
        onClick={attributes.focusCircle}
      />
    </React.Fragment>
  );
}

export default Triangle;
