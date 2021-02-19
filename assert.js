/*
 * Subclase especializada de Error para aserciones.
 */
export class AssertError extends Error {}

/*
 * Función creada debido a la incompatibilidad del módulo
 * assert de Node.js con React Native.
 */
export function assert(value, message) {
  if (!value) {
    throw new AssertError(
      `Assertion failed: ${message || `Got falsy value ${value}`}`
    );
  }
}
