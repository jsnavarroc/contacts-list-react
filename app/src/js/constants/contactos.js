// Dependencies
import { definirAccion } from '../utils/definirAccion';
import { INICIO, COMPLETADO, ERROR } from './estadosFrecuentes';

const constantesHTTP = [ INICIO, COMPLETADO, ERROR ];

//Estado local
export const ESTADO_CONTACTOS = definirAccion('ESTADO_CONTACTOS',
['LIMPIAR_FORMULARIO', 'GUARDAR_NOMBRE', 'GUARDAR_CELULAR']);

// Peticiones al servidor
export const OBTENER_CONTACTOS = definirAccion('OBTENER_CONTACTOS', constantesHTTP);
export const CREAR_CONTACTO = definirAccion('CREAR_CONTACTO', constantesHTTP);
export const ACTUALIZAR_CONTACTO = definirAccion('ACTUALIZAR_CONTACTO', constantesHTTP);
export const BORRAR_CONTACTO = definirAccion('BORRAR_CONTACTO', constantesHTTP);
