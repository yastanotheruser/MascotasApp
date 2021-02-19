import React from 'react';
import { Appbar } from 'react-native-paper';

/*
 * Barra superior de la aplicación, generada utilizando la
 * librería de Material Design para React Native llamada
 * React Native Paper.
 *
 * La barra incluye el título de la aplicación y un botón
 * para volver a cargar la lista de mascotas.
 */
class AppBar extends React.Component {
  /*
   * Inicializar el componente, en los props se incluye un
   * EventEmitter que permitirá conocer cuándo deshabilitar
   * acciones que se realizan en la barra (recargar).
   *
   * El evento loadingchange permite al AppBar conocer si
   * se está cargando el recurso en el componente ListaMascotas.
   */
  constructor(props) {
    super(props);
    this._emitter = props.emitter || null;
    this.onLoadingChange = this.onLoadingChange.bind(this);
    this._emitter && this._emitter.on('loadingchange', this.onLoadingChange);
    this.state = { loading: false };
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.Content title="MascotasApp" />
        <Appbar.Action
          icon="refresh"
          onPress={() => this._emitter && this._emitter.emit('reload')}
          disabled={this.state.loading}
        />
      </Appbar.Header>
    );
  }

  /*
   * Eliminar listener del EventEmitter.
   */
  componentWillUnmount() {
    this._emitter.removeListener('loadingchange', this.onLoadingChange);
  }

  /*
   * Ocurrió un cambio en el valor loading de ListaMascotas.
   */
  onLoadingChange(loading) {
    this.setState({ loading });
  }
}

export default AppBar;
