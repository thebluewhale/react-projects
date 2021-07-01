import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {Router, Scene, Reducer, Modal} from 'react-native-router-flux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Home from './Home';
import {
	Webpage, PopupPage, Search, Selection
} from '../components';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const RouterWithRedux = connect()(Router);

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RouterWithRedux>
					<Scene key='modal' component={Modal}>
						<Scene key='root' hideNavBar hideTabBar>
							<Scene key='home' component={Home} title='home' initial/>
							<Scene key='webpage' component={Webpage} title='webpage'/>
							<Scene key='popuppage' component={PopupPage} title='popuppage'/>
							<Scene key='search' component={Search} title='search'/>
							<Scene key='selection' component={Selection} title='selection'/>
						</Scene>
					</Scene>
				</RouterWithRedux>
			</Provider>
		);
	}
}
