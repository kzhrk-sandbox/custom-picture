module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: [
      ["@babel/preset-env", {
        targets: {
          browsers: [
            "ie >= 11"
          ]
        },
        useBuiltIns: "usage"
      }]
    ],
    plugins: [
      "@babel/plugin-syntax-object-rest-spread"
    ]
  }
};