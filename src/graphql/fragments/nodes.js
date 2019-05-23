export const nodes = `
  fragment node on Node @client {
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
  fragment nodes on NodeList @client {
    id
    list {
      ...node
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
