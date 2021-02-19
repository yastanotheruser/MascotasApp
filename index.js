import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Buffer } from 'buffer';
import { URL } from 'whatwg-url';
import API from './api';
import App from './App';
import { name as appName } from './app.json';

/*
 * Variables globales requeridas en otros archivos, no
 * soportadas de forma predeterminada por React Native.
 */
global.Buffer = Buffer;
global.URL = URL;

/*
 * Componente principal. El wrapper PaperProvider permite
 * hacer uso de los componentes Material de Paper.
 */
const Main = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);

/*
 * Inicializar módulo para consumo del API.
 */
API.init();

export default Main;
