module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@app': './src/app',
            '@core': './src/core',
            '@features': './src/features',
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@store': './src/store',
          },
        },
      ],
      'react-native-reanimated/plugin',
      // Autres plugins si nécessaire
    ],
  };
};
