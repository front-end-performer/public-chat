import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer } from './reducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { init } from './socket';
import Join from './components/Join/Join';
import App from './components/App/App';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let elem;
const userIsLogin = location.pathname != '/join';

if (!userIsLogin) {
    elem = <Join />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
