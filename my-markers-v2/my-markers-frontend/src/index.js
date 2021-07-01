import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './Root';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AppContainer as HotContainer } from 'react-hot-loader';

const render = (Component, store) => ReactDOM.render(
    (
        <HotContainer>
            <Component store={store} />
        </HotContainer>
    ),
    document.getElementById('root')
);

let  store = createStore(reducers, applyMiddleware(thunk));
if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
}

render(Root, store);

if (module.hot) {
    module.hot.accept('./Root', () => render(Root));
}

registerServiceWorker();
