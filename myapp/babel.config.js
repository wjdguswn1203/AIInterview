module.exports = function(api) {
  api.cache(true);
  return {
    // presets: ['babel-preset-expo'],
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@utils": "./src/utils",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        safe: false,
        aloowUndefined: true,
      },
    ],
  ],
  };
};
