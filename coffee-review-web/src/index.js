import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import {App, Home} from 'containers';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	    <Router history={browserHistory}>
	        <Route path='/' component={App}>
				<IndexRoute component={Home}/>
	        </Route>
	    </Router>
	</Provider> , rootElement
);
