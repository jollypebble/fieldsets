// Basic SVG shapes
import { default as Circle } from './Circle';
import { default as Rectangle } from './Rectangle';
import { default as Ellipse } from './Ellipse';
import { default as Triangle } from './Triangle';

// Grouping Shapes
import { default as LabelGroup } from './LabelGroup';
import { default as RadialGroup } from './RadialGroup';

const ShapeDefaults = {
  Circle: Circle,
  Rectangle: Rectangle,
  Ellipse: Ellipse,
  LabelGroup: LabelGroup,
  RadialGroup: RadialGroup,
  Triangle: Triangle
}

export default ShapeDefaults
