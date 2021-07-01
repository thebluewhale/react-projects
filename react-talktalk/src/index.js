import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {App, Home, Authentication, Search, Chat} from 'containers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	    <Router history={browserHistory}>
	        <Route path='/' component={App}>
				<IndexRoute componen={Home}/>
				<Route path='home' component={Home}/>
				<Route path='authentication/:mode' component={Authentication}/>
				<Route path='search' component={Search}/>
				<Route path='chat/:partner' component={Chat}/>
	        </Route>
	    </Router>
	</Provider> , rootElement
);
