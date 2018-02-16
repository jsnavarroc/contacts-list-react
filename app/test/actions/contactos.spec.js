import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as CONSTANTES_CONTACTO from '../../src/js/constants/contactos';
import * as ACCIONES from '../../src/js/actions/contactos';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const expect = global.expect;

describe('Contactos - Acciones', () => {
    describe('Acciones Generales', () => {
        it('limpiarFormulario() retorna el objeto esperado.', () => {
            const actual = ACCIONES.limpiarFormulario();
            const esperado = {
                    type: CONSTANTES_CONTACTO.ESTADO_CONTACTOS.LIMPIAR_FORMULARIO,
                    payload: {
                        nombre:'',
                        celular:'',
                    },
            };
            expect( actual ).toEqual( esperado );
        });

        it('guardarNombre() retorna el objeto esperado.', () => {
            const mockContacto = { nombre: 'Johan', celular: '316699854' };
            const actual = ACCIONES.guardarNombre(mockContacto.nombre);
            const esperado = {
                    type: CONSTANTES_CONTACTO.ESTADO_CONTACTOS.GUARDAR_NOMBRE,
                    payload: {
                        nombre: mockContacto.nombre,
                    },
            };
            expect( actual ).toEqual( esperado );
        });

        it('guardarCelular() retorna el objeto esperado.', () => {
            const mockContacto = { nombre: 'Johan', celular: '316699854' };
            const actual = ACCIONES.guardarCelular(mockContacto.celular);
            const esperado = {
                    type: CONSTANTES_CONTACTO.ESTADO_CONTACTOS.GUARDAR_CELULAR,
                    payload: {
                        celular: mockContacto.celular,
                    },
            };
            expect( actual ).toEqual( esperado );
        });
    });

    describe('Obtener Contactos', () => {
        it('obtenerContactosInicio() retorna el objeto esperado.', () => {
            const actual = ACCIONES.obtenerContactosInicio();
            const esperado = {
                type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.INICIO,
                payload: {
                    contactos:[],
                    cargando:true,
                    error:'',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('obtenerContactosCompletado() retorna el objeto esperado.', () => {
            const mockContacto = { nomebre:'Johan', 'celular':'3166996469' };
            const actual = ACCIONES.obtenerContactosCompletado(mockContacto);
            const esperado = {
                type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.COMPLETADO,
                payload: {
                    contactos:mockContacto,
                    cargando:false,
                    error:'',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('obtenerContactosError( error ) retorna el objeto esperado.', () => {
            const mockError = 'Este es un error de prueba';
            const actual = ACCIONES.obtenerContactosError( mockError );
            const esperado = {
                type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.ERROR,
                payload: {
                    error: mockError,
                    cargando:false,
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('obtenerContactos() retorna el objecto esperado cuando es Completado.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};

			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [mockContacto],
					cargando: false,
					error: '',
				},
			};
			// Detener y simular una llamada satisfactoria
			const stubAxiosGet = sinon.stub(axios, 'get')
				.callsFake(() => Promise.resolve({ data: mockContacto }));

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			return store.dispatch(
				ACCIONES.obtenerContactos()
			)
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.INICIO,
						payload: {
                            contactos:[],
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.COMPLETADO,
						payload: {
							contactos: mockContacto,
							cargando: false,
							error: '',
						},
					}];

					stubAxiosGet.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});

        it('obtenerContactos() retorna el objecto esperado cuando es Error.', (done) => {
            const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
                nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};
			const error = 'Se produjo un error';

			// Detener y simular una llamada satisfactoria
			const stubAxiosGet = sinon.stub(axios, 'get')
            .callsFake(() => Promise.reject(error));

			const store = mockStore({
				contactos: {
                    contactos: [mockContacto],
				},
			});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.obtenerContactos())
            .then(() => {
					const actual = store.getActions();
					const esperado = [{
                        type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.INICIO,
						payload: {
                            contactos:[],
                            cargando:true,
                            error:'',
						},
					}, {
                        type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.ERROR,
						payload: {
                            error,
							cargando: false,
						},
					}];

					stubAxiosGet.restore();
					expect(actual).toEqual(esperado);
					done();
				});
        });

    });

    describe('CrearContactos', () => {
        it('crearContactoInicio() retorna el objeto esperado.', () => {
            const actual = ACCIONES.crearContactoInicio();
            const esperado = {
                type: CONSTANTES_CONTACTO.CREAR_CONTACTO.INICIO,
                payload: {
                    cargando:true,
                    error:'',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('crearContactoCompletado( contacto ) retorna el objeto esperado.', () => {
            const mockContacto = { nombre:'Johan', 'celular':'3166996469' };
            const actual = ACCIONES.crearContactoCompletado(mockContacto);
            const esperado = {
                type: CONSTANTES_CONTACTO.CREAR_CONTACTO.COMPLETADO,
                payload: {
                    contacto:mockContacto,
                    cargando:false,
                    error:'',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('crearContactoError( error ) retorna el objeto esperado.', () => {
            const mockError = 'Este es un error de prueba';
            const actual = ACCIONES.crearContactoError( mockError );
            const esperado = {
                type: CONSTANTES_CONTACTO.CREAR_CONTACTO.ERROR,
                payload: {
                    error: mockError,
                    cargando:false,
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('crearContacto(nombre, celular) retorna el objecto esperado cuando es Completado.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Johan',
				celular: '31666565',
				uid,
            };

			// Detener y simular una llamada satisfactoria
			const stubAxiosPost = sinon.stub(axios, 'post')
				.callsFake(() => Promise.resolve({ item: mockContacto }));

			const store = mockStore({});
			// Ejecutar el Async Action Creator
			return store.dispatch(
				ACCIONES.crearContacto(mockContacto.nombre, mockContacto.celular)
			)
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.CREAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.CREAR_CONTACTO.COMPLETADO,
						payload: {
							contacto: mockContacto,
							cargando: false,
							error: '',
						},
					}];

					stubAxiosPost.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});

        it('crearContacto(nombre, celular) retorna el objecto esperado cuando es Error.', (done) => {
            const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
                nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};
			const error = 'Se produjo un error';

			// Detener y simular una llamada satisfactoria
			const stubAxiosPost = sinon.stub(axios, 'post')
            .callsFake(() => Promise.reject(error));

			const store = mockStore({});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.crearContacto(mockContacto.nombre, mockContacto.celular))
            .then(() => {
					const actual = store.getActions();
					const esperado = [{
                        type: CONSTANTES_CONTACTO.CREAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
                        type: CONSTANTES_CONTACTO.CREAR_CONTACTO.ERROR,
						payload: {
							cargando: false,
							error,
						},
					}];

					stubAxiosPost.restore();
					expect(actual).toEqual(esperado);
					done();
				});
        });

    });

    describe('Actualizar Contacto', () => {
        it('actualizarContactoInicio() retorna el objeto esperado.', () => {
            const actual = ACCIONES.actualizarContactoInicio();
            const esperado = {
                type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.INICIO,
                payload: {
                    cargando: true,
                    error:'',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('actualizarContactoCompletado( contacto, index ) retorna el objeto esperado.', () => {
            const mockContacto = { nombre: 'Johan', celular: '316699854' },
                  index = 100;

            const actual = ACCIONES.actualizarContactoCompletado(mockContacto, index);
            const esperado = {
                type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.COMPLETADO,
                payload: {
                    contacto: mockContacto,
                    index,
                    cargando:false,
                    error:'',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('actualizarContactoError( error ) retorna el objeto esperado.', () => {
            const mockError = 'Este es un error de prueba';
            const actual = ACCIONES.actualizarContactoError( mockError );
            const esperado = {
                type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.ERROR,
                payload: {
                    error: mockError,
                    cargando:false,
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('actualizarContacto(nombre, celular, uid) retorna el objecto esperado cuando es Completado.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};

			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [mockContacto],
					cargando: false,
					error: '',
				},
			};
			// Detener y simular una llamada satisfactoria
			const stubAxiosActualizar = sinon.stub(axios, 'put')
				.callsFake(() => Promise.resolve({ item: mockContacto }));

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			return store.dispatch(
				ACCIONES.actualizarContacto(mockContacto.nombre, mockContacto.celular, uid)
			)
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.COMPLETADO,
						payload: {
							contacto: mockContacto,
							cargando: false,
							error: '',
							index: 0,
						},
					}];

					stubAxiosActualizar.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});

        it('actualizarContacto(nombre, celular, uid) retorna el objecto esperado cuando es Error.', (done) => {
            const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
                nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};
			const error = 'Se produjo un error';

			// Detener y simular una llamada satisfactoria
			const stubAxiosActualizar = sinon.stub(axios, 'put')
            .callsFake(() => Promise.reject(error));

			const store = mockStore({
				contactos: {
                    contactos: [mockContacto],
				},
			});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.actualizarContacto(mockContacto.nombre, mockContacto.celular, uid))
            .then(() => {
					const actual = store.getActions();
					const esperado = [{
                        type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
                        type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.ERROR,
						payload: {
							cargando: false,
							error,
						},
					}];

					stubAxiosActualizar.restore();
					expect(actual).toEqual(esperado);
					done();
				});
        });

        it('actualizarContacto(nombre, celular, uid) retorna el objecto esperado cuando el uid no se encontró.', () => {

			const uid = 'asda!E3-##@$#@$#-DSFdsfs';

			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: 'asda!E3-##@$#@$#',
			};

			const error = 'El contacto no ha sido encontrado.';

			const store = mockStore({
				contactos: {
					contactos: [mockContacto],
				},
			});

			// Ejecutar el Async Action Creator
			const actual = store.dispatch(ACCIONES.actualizarContacto(mockContacto.nombre, mockContacto.celular, uid));
			const esperado = {
				type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.ERROR,
				payload: {
					error,
					cargando: false,
				},
			};
			expect(actual).toEqual(esperado);
		});

    });

    describe('Borrar Contacto', () => {
        it('borrarContactoInicio() retorna el objeto esperado', () => {
            const actual = ACCIONES.borrarContactoInicio();
            const esperado = {
                type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.INICIO,
                payload: {
                    cargando: true,
                    error: '',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('borrarContactoCompletado( index ) retorna el objeto esperado.', () => {
            const index = 100;

            const actual = ACCIONES.borrarContactoCompletado( index );
            const esperado = {
                type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.COMPLETADO,
                payload: {
                    index,
                    cargando: false,
                    error: '',
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('borrarContactoError( error ) retorna el objeto esperado.', () => {
            const mockError = 'Este es un error de prueba';
            const actual = ACCIONES.borrarContactoError( mockError );
            const esperado = {
                type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.ERROR,
                payload: {
                    error: mockError,
                    cargando:false,
                },
            };
            expect( actual ).toEqual( esperado );
        });

        it('borrarContacto(uid) retorna el objecto esperado cuando es Completado.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Johan',
				celular: '316696469',
				uid,
			};

			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [mockContacto],
					cargando: false,
					error: '',
				},
			};
			// Detener y simular una llamada satisfactoria
			const stubAxiosDelete = sinon.stub(axios, 'delete')
				.callsFake(() => Promise.resolve({ uid }));

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			return store.dispatch(
				ACCIONES.borrarContacto(uid)
			)
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.COMPLETADO,
						payload: {
                            index: 0,
							cargando: false,
							error: '',
						},
					}];

					stubAxiosDelete.restore();
					expect(actual).toEqual(esperado);
					done();
				});
        });

        it('borrarContacto(uid) retorna el objecto esperado cuando es Error.', (done) => {
            const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
                nombre: 'Johan',
				celular: '2211-99-11',
				uid,
			};
			const error = 'Se produjo un error';

			// Detener y simular una llamada satisfactoria
			const stubAxiosDelete = sinon.stub(axios, 'delete')
            .callsFake(() => Promise.reject(error));

			const store = mockStore({
				contactos: {
                    contactos: [mockContacto],
				},
			});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.borrarContacto(uid))
            .then(() => {
					const actual = store.getActions();
					const esperado = [{
                        type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
                        type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.ERROR,
						payload: {
							cargando: false,
							error,
						},
                    }];

					stubAxiosDelete.restore();
					expect(actual).toEqual(esperado);
					done();
				});
        });

        it('borrarContacto(uid) retorna el objecto esperado cuando el uid no se encontró.', () => {

			const uid = 'asda!E3-##@$#@$#-DSFdsfs';

			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: 'asda!E3-##@$#@$#',
			};

			const error = 'El contacto no ha sido encontrado.';

			const store = mockStore({
				contactos: {
					contactos: [mockContacto],
				},
			});

			// Ejecutar el Async Action Creator
			const actual = store.dispatch(ACCIONES.borrarContacto(uid));
			const esperado = {
				type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.ERROR,
				payload: {
					error,
					cargando: false,
				},
			};
			expect(actual).toEqual(esperado);
		});
    });
});
