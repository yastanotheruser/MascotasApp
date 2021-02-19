/*
 * Módulo para el consumo del servicio web.
 */
import axios from 'axios';
import urljoin from 'url-join';
import { assert } from './assert';
import { API_URL, API_BASE_PACKAGE, API_RESOURCES_PATH } from '@env';

/*
 * Asegurarse que las URL son de HTTP.
 */
function assertHTTP(url) {
  assert(url.protocol === 'http:' || url.protocol === 'https:');
}

const API = {
  _basePackage: null,
  resources: null,

  /*
   * Inicializar valores para el módulo, puede hacerse uso
   * de variables de entorno al momento de construir la
   * aplicación, con el fin de definir la URL donde se
   * localiza la API. De lo contrario se utilizan valores
   * predeterminados.
   */
  init() {
    let _apiBaseURL;
    try {
      _apiBaseURL = new URL(API_URL || 'http://localhost:8080/WSMascotas');
      assertHTTP(_apiBaseURL);
    } catch (err) {
      console.error('Invalid API base URL');
      throw err;
    }

    let _apiBasePackage = API_BASE_PACKAGE || 'co.edu.udenar.mascotas';
    try {
      assert(/^(?:[A-Za-z0-9]\w*)(?:\.[A-Za-z0-9]\w*)*$/.test(_apiBasePackage));
    } catch (err) {
      console.log('Invalid API base resources package');
      throw err;
    }

    this.resources = axios.create({
      baseURL: urljoin(_apiBaseURL.href, API_RESOURCES_PATH || '/webresources'),
      headers: {
        Accept: 'application/json',
      },
    });
    this._basePackage = _apiBasePackage;
  },

  /*
   * Función genérica para obtener un recurso del servicio
   * web REST a partir de su nombre. Puede incluirse el
   * nombre del package o en caso de iniciar con '.' se
   * utllizá un package predeterminado, definido en init.
   */
  async getResource(name, config) {
    name = String(name);
    if (name.charAt(0) === '.') {
      name = this._basePackage + name;
    }

    try {
      const response = await this.resources.get(`/${name}`, config);
      return response.data;
    } catch (err) {
      return err;
    }
  },
};

export default API;
