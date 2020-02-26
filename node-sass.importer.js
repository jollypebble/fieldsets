// This is a custom importer that allows us to handle typscripts ~ references to node modules. Since create react app hides webpack from us, we can manage our node-sass calls here.
const path = require('path');

module.exports = (url, prev, done) => {
    if (url[0] === '~') {
        url = path.resolve('node_modules', url.substr(1));
    }

    return { file: url };
}