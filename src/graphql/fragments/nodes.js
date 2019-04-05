export const nodes = `
  fragment node on Circle @client {
    id
    name
    centerX
    centerY
    zoom {
      x
      y
      scale
    }
  }
  fragment nodes on NodeList @client {
    id
    list {
      ...node
    }
  }
`;
