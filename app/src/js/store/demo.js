import store from './index';
import { guardarNombre, guardarCelular, crearContactoCompletado } from '../actions/contactos';

console.log('=== Estado Incial ===');

console.log(store.getState());

console.log('=== End of Estate Initial ===');

const cancelarSuscripcion = store.subscribe(() => {

    console.log('=== Nuevo Estado ===');

    console.log(store.getState());

    console.log('=== End of New State ===');

});

store.dispatch( guardarNombre('Jenifer') );
store.dispatch( guardarCelular( '36-45-22' ) );
store.dispatch( crearContactoCompletado( { name:'Johan', celular:'32-56-55' } )  );

cancelarSuscripcion();
