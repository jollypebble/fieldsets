import gql from 'graphql-tag';

export const getDiagramData = gql`
  query getDiagramData @client {
      id
      name
      fields
      centerX
      centerY
  }
`;
