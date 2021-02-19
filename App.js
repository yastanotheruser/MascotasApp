import React from 'react';
import EventEmitter from 'events';
import AppBar from './AppBar';
import ListaMascotas from './ListaMascotas';

/*
 * Componente central de la aplicación. Contiene el AppBar y
 * el componente ListaMascotas, además de crear un
 * EventEmitter para la notificación de eventos.
 */
const App = () => {
  const emitter = new EventEmitter();
  return (
    <>
      <AppBar emitter={emitter} />
      <ListaMascotas emitter={emitter} />
    </>
  );
};

export default App;
