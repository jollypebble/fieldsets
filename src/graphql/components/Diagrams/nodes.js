import gql from 'graphql-tag';
const node = `
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
    fields {
      ...field
    }
  }
`;
export const getNodes = gql`
  query getNodes @client {
    nodes {
      ...node
    }
  }
  ${node}
`;

export const getNodeData = gql`${node}`;
