module.exports = {
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: [
          "@import './src/styles/reset-bootstrap.scss';",
          "@import './node_modules/bootstrap/scss/bootstrap.scss';",
          "@import './src/styles/global.scss';",
        ].join(' '),
      },
    },
  },
};
