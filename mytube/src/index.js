import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import {
	App, Home, Login, Register,
	Upload, Wall, Search
} from 'containers';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	    <Router history={browserHistory}>
	        <Route path='/' component={App}>
				<IndexRoute component={Home}/>
				<Route path='login' component={Login}/>
				<Route path='register' component={Register}/>
				<Route path='upload' component={Upload}/>
				<Route path='wall/:wall' component={Wall}/>
				<Route path='search' component={Search}/>
	        </Route>
	    </Router>
	</Provider> , rootElement
);
