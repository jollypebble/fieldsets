# React Point
React Point is a data visualization framework used to help develop react based data visualization components.

React Point is an both a UI and a Data abstraction layer. It will provide you [Material Design Components](https://react-md.mlaursen.com/) to wrap around your data visualization diagram as well as an abstraction data node which can be pulled into your data visualization framework of your choice. In this example, we rely on strict SVG standards when rendering our node in browser, but you could simply pass a SVG instead via d3, or simply use css and html5. As this a work in progress, many of these truths have not been tested as functional, let alone paid attention to. Most likely there are a bunch of place holders for the `@TODO: $DREAMING_BIG` thoughts.

As our proof of concept, we will draw a circle diagram that can render a visualization for how to best invest in the future. It is used as a sales tool and is used to help clients see how their income and savings are grouped and determine the best path forward with any additional resources.

This framework was initially funded by [Econ Circles](https://www.econcircles.com)

# Technical Components

Econ Circles is built using react and material design as the primary framework for the UI and d3/svg for the data visualization. On the backend, the application uses apollo/graphQL for both local state storage as well as remote data queries. This application is built using Google Sheets as a data store, but allows for the flexibility to swap data stores easily to a more traditional database approach. Google sheets is a familiar tool for many financial planners so it allows us to get the application running quickly without the need for doing heavy data architecture design.

## System Requirements

* [NPM](https://www.npmjs.com/get-npm) (Built with 6.4.1)

# Getting Started

From the local top level directory of this codebase run:
``npm install``

For local development and to run a server locally run:
``npm run start``

For a final production build:

``npm run build``

# Code Structure

### Glossary

+ **UI**: The containers and components that a user interacts with. This does not include the data visualzation diagram.
+ **Diagram**: A SVG standards based data visualization that is displayed in the viewer aread of the UI

## React-MD and UI
The UI components are pulled heavily from [react-md](https://react-md.mlaursen.com/components/autocompletes). The top level container for the UI can be found in `src/containers/UI` and you can trace down the corresponding components in the `src/components` directory.

## Data visualization Diagrams
The main set of data for the circles can be found in `src/config/data/DiagramData.js`. Currently it has labels, slugs and center locations for the parent child nodes of the diagram.

The main REACT component container for the data visualization is found in `src/containers/Diagrams/CircleDiagram/CircleDiagram.jsx` with the heavy lifting of SVG interactions and Transitions happening in `src/components/Diagrams/RadialeNode.jsx`.

## Styles

This App separates styles from react components so it does not require much knowledge to apply basic styles to the application. All styles are found in `src/styles` as scss and will be converted to css during the watch and build process. You may add any new scss files you like, just ensure you add file to the index of it's parent directory. I'd love help getting this styled properly.

# BUILD NOTES:

I like to include how I approached each project in part of my build notes. It's possible that my understanding of how React Works differs from yours. If this repository has grown enough that people are reading these build notes, not only would I be very happy, but I would also encourage you to add in any places where my understanding is incorrect and the correct fixes you put in place and even a blurb of the way you understand REACT.

## Contributor Notes

A little about me, [Will Gladstone](https://will.gl@dst.one), the creator of this repository. I am a data scientist and spent 8 years getting a PhD in Bioinformatics which I never used and just kept on coding because it pays. But I still love data and I love thinking about ways to make it easier to see patterns or trends. My hopes for this project is that it becomes an open discussion platform that not only helps us make money a little easier in our day to day, but also helps any folks hoping to become better developers and improve their understanding of today's DOM-centric applications.

This is my first true project in REACT. To be honest, there are many things about REACT that I can see what they want to do with it and it's super exciting. Imagine a world where components have been abstracted to the point where everything can work on every device everywhere as long as there is a custom API for those devices. As of the last update of this repo, it feels a long way away to me.

React and ReactNative are still two different entities, have two different sets of resources and two different sets of core contributors.  Quite frankly I think REACT and DOM thinking can be overly abstract. I believe code can be too DRY. 

I think often DRYness is an excuse for making code as confusing as fuck. I have been guilty of this as well. But lessons learned.

As you familiarize yourself with this code base, approach it with my underlying philosophy in mind. For this REACT project focus on minimizing redundant persistent data, passing references for maximal performance and minimal memory foot print so the browser can handle more data points for larger data sets.

In learning REACT, I've approached this using relational thinking while taking DRYness into consideration. I like to think of the traditional persistant memory cache (memcached, redis) as the apollo client sitting on top of of our react app. I allow in-focus data points to bloat if it means I can prime all the data I that might need to be edited in the first pull.
