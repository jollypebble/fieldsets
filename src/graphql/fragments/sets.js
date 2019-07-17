export const sets = `
  fragment set on Set @client {
    id
    name
    centerX
    centerY
    depth
    parent
    display {
      ...display
    }
  }
  fragment sets on SetList @client {
    id
    list {
      ...set
    }
  }
  fragment display on DisplayData @client {
    id
    shape
    visible
    zoom {
      ...zoom
    }
  }
  fragment zoom on ZoomData @client {
    id
    x
    y
    scale
  }
`;
