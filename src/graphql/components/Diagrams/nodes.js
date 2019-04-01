import gql from 'graphql-tag';
export const getNodes = gql`
  query getNodes @client {
    nodes {
      id
      name
      centerX
      centerY
      depth
      zoom {
        x
        y
        scale
      }
      fields {
        ...field
      }
    }
  }
`;

export const getNodeData = gql`
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