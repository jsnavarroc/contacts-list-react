// Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { contactosLimpiarFormMiddleware } from '../middleware/contactos';

import reducers from '../reducers';

const createStoreWithMiddelware  = compose (
 applyMiddleware(thunk, contactosLimpiarFormMiddleware),
)(createStore);

export default createStoreWithMiddelware(reducers);
