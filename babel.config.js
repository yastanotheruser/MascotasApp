/*
 * Configuración de Babel según recomendaciones de los
 * módulos React Native, Paper y soporte de variables de
 * entorno en React Native.
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module:react-native-dotenv',
      {
        allowUndefined: true,
      },
    ],
  ],
};
