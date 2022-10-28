// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.glsl$/i,
          type: 'asset/source',
        },
      ],
    },
  });
};
