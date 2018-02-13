// Dependencies
import { definirAccion } from '../utils/definirAccion';
import { INICIO, COMPLETADO, ERROR } from './estadosFrecuentes';

const accionesHTTP = [ INICIO, COMPLETADO, ERROR ];
//Estado local
definirAccion('ESTADO_CONTACTOS', ['LIMPIAR_FORMULARIO',
                                   'GUARDAR_NOMBRE',
                                   'GUARDAR_CELULAR']);

// Peticiones al servidor
export const OBETENER_CONTACTOS = definirAccion('OBETENER_CONTACTOS', accionesHTTP);
export const CREAR_CONTACTOS = definirAccion('CREAR_CONTACTOS', accionesHTTP);
export const ACTUALIZAR_CONTACTOS = definirAccion('ACTUALIZAR_CONTACTOS', accionesHTTP);
export const BORRAR_CONTACTOS = definirAccion('BORRAR_CONTACTOS', accionesHTTP);
