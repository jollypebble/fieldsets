const Shapes = {
  rectangle: {
    shape: 'rect',
    shapeProps: {
      width: 20,
      height: 20,
      x: -10,
      y: -10,
    },
  },
  parentcircle: {
    shape: 'ellipse',
    shapeProps: {
      cx: 0,
      cy: 10,
      rx: 100,
      ry: 50,
    }
  },
  childcircle: {
    shape: 'ellipse',
    shapeProps: {
      cx: 0,
      cy: 10,
      rx: 70,
      ry: 50,
    }
  }
};
export default Shapes;
