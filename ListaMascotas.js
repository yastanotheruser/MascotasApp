import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
  ToastAndroid,
} from 'react-native';
import { Card, Button, Colors } from 'react-native-paper';
import API from './api';

/**
 * Componente para visualizar la lista de mascotas.
 */
class ListaMascotas extends React.Component {
  /**
   * El prop emitter debe ser un objeto de tipo EventEmitter
   * (del módulo events de Node.js), a través del cual se
   * envían y reciben eventos de otros componentes.
   *
   * El estado loading establece si se está obteniendo el
   * recurso del servidor. El estado mascotas es un arreglo
   * que contiene la informacion de las mascotas.
   */
  constructor(props) {
    super(props);
    this._emitter = props.emitter || null;
    this.onReload = this.onReload.bind(this);
    this._emitter && this._emitter.on('reload', this.onReload);
    this.state = {
      loading: false,
      mascotas: [],
    };
  }

  /*
   * Cargar datos una vez se haya montado el componente.
   */
  componentDidMount() {
    this.loadData();
  }

  /*
   * Dejar de escuchar eventos del emitter una vez se haya
   * eliminado el componente del DOM virtual.
   */
  componentWillUnmount() {
    this._emitter && this._emitter.removeListener('reload', this.onReload);
  }

  /*
   * Se renderizan, contenidos en un View, un ScrollView
   * con componentes Card para visualizar los detalles de
   * las mascotas, y un View que se mostrará solo cuando se
   * esté cargando el recurso.
   */
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          {this.state.mascotas.map((m, i) => (
            <Card style={styles.card} key={i}>
              <Card.Title title={m.nombre} subtitle={`Raza: ${m.raza}`} />
              <Card.Cover source={{ uri: m.imagen }} />
              <Card.Actions>
                <Button onPress={() => Linking.openURL(m.informacion)}>
                  Más información
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
        {this.state.loading && (
          <View style={styles.activityOverlay}>
            <ActivityIndicator
              animating={true}
              size={50}
              color={Colors.purple600}
            />
          </View>
        )}
      </View>
    );
  }

  /*
   * Al recibir el evento reload, emitido desde el componente
   * AppBar, volver a cargar los datos.
   */
  onReload() {
    this.loadData();
  }

  /*
   * Función para modificar el valor del estado loading, que
   * además notifica este cambio por medio del emitter.
   */
  setLoading(loading) {
    if (Boolean(this.state.loading) === Boolean(loading)) {
      return;
    }

    this._emitter && this._emitter.emit('loadingchange', loading);
    this.setState({ loading });
  }

  /*
   * Función que obtiene los datos del servidor utilizando
   * el módulo local API, que a su vez hace uso de axios.
   * Inicialmente se establece que el recurso está siendo
   * cargado, y luego, mediante el método finally de la
   * promesa retornada, se indica que la carga ha concluido
   * sea cual sea el resultado. Se almacena el arreglo en el
   * estado mascotas.
   */
  async loadData() {
    this.setLoading(true);
    const result = await API.getResource('.mascotas').finally(() =>
      this.setLoading(false)
    );

    if (result instanceof Error) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Error al obtener la lista de mascotas',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }

      return;
    }

    this.setState({ mascotas: result });
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexGrow: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  activityOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },
  card: {
    marginBottom: 20,
    elevation: 8,
  },
});

export default ListaMascotas;
