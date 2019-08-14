export default {
  servers: {
      // graphql: 'http://ec2-3-91-177-72.compute-1.amazonaws.com'
      graphql: 'http://localhost:8000'
  },
  diagrams: [
    // In the fieldsets framework, Diagrams are another set type. Here we can define which diagrams we want to use, so we can persistantly store their data for any aggregated data analysis.
    {
      id: 'CircleDiagram',
      name: 'Econ Circles'
    }
  ]
};
