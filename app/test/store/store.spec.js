import map from 'lodash/map';
import store from '../../src/js/store';
import { guardarNombre } from '../../src/js/actions/contactos';

const expect = global.expect;

describe('store', () => {
    it('verifique que el state tiene las secciones esperadas', () => {
        const secciones = map( store.getState(), ( value, key) => key );
        const actual = secciones;
        const esperado = ['contactos'];

        expect(actual).toEqual(esperado);
    });

    it('Verificar el dispacht actual del estado', () => {
        store.dispatch(guardarNombre('Jen'));
        const actual = store.getState().contactos;
        const esperado = {
            nombre:'Jen',
            celular:'',
            contactos:[],
            cargando:false,
            error:'',
        };

        expect(actual).toEqual(esperado);
    });
});
