import { createStore ,compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { persistStore } from 'redux-persist';
import reducer from './reducer';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));
const persister = persistStore(store);

export { store, persister };

