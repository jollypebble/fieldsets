# Econ Circles
Econ Circles is a financial planning data visualization tool used to help clients visualize how to best invest in the future. It is used as a sales tool and is used to help clients see how their income and savings are grouped and determine the best path forward with any additional resources.

# Technical Components

Econ Circles is built using react and material design as the primary framework for the UI and d3 for the data visualization. On the backend, the application uses apollo/graphQL for both local state storage as well as remote data queries. This application is built using Google Sheets as a data store, but allows for the flexibility to swap data stores easily to a more traditional database approach. Google sheets is a familiar tool for many financial planners so it allows us to get the application running quickly without the need for doing heavy data architecture design.

## System Requirements

* [NPM](https://www.npmjs.com/get-npm) (Built with 6.4.1)

# Getting Started

From the local top level directory of this codebase run:
```npm install```

For local development and to run a server locally run:
```npm run start```

For a final production build:

```npm run build```

# Code Structure

### Glossary

+ **UI**: The containers and components that a user interacts with. This does not include the data visualzation diagram.
+ **Diagram**: A d3.js based data visualization that is displayed in the viewer aread of the UI

## React-MD and UI
The UI components are pulled heavily from [react-md](https://react-md.mlaursen.com/components/autocompletes). The top level container for the UI can be found in `src/containers/UI` and you can trace down the corresponding components in the `src/components` directory.

## D3 & Data visualization Diagrams
The main set of data for the circles can be found in `src/config/diagramData.js`. Currently it has labels, slugs and center locations for the parent child nodes of the diagram.

The main container for the d3 visualization is found in `src/containers/Diagrams/CircleDiagram/CircleDiagram.jsx` with the heavy liftying of d3 interactions happening in `src/components/Diagrams/CircleNode.jsx`.

## Styles
This App separates styles from react components so it does not require much knowledge to apply basic styles to the application. All styles are found in `src/styles` as scss and will be converted to css during the watch and build process. You may add any new scss files you like, just ensure you add file to the index of it's parent directory.
