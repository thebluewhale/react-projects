import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {Router, Scene, Reducer, Modal} from 'react-native-router-flux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Home from './Home';
import BrandView from './BrandView';
//import {Webpage, PopupPage, Search} from '../components';

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
							<Scene key='brandview' component={BrandView} title='brandview'/>
						</Scene>
					</Scene>
				</RouterWithRedux>
			</Provider>
		);
	}
}
