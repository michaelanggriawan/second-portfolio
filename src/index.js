import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore  } from 'redux-firestore';
import { reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import * as serviceWorker from './serviceWorker';
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
        compose(
            applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
            reactReduxFirebase(fbConfig),
            reduxFirestore(fbConfig) // redux bindings for firestore
        )
    )
ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
