import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {Router, Scene, Reducer, Modal} from 'react-native-router-flux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import MainPage from './MainPage';
import {FindCity, ErrorPopup, SelectCity, Settings} from '../components';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const RouterWithRedux = connect()(Router);

export default class WeatherScanner extends Component {
	render() {
		return (
			<Provider store={store}>
				<RouterWithRedux>
					<Scene key='modal' component={Modal}>
						<Scene key='root' hideNavBar hideTabBar>
							<Scene key='mainpage' component={MainPage} title='Main Page' initial/>
							<Scene key='findcity' component={FindCity} title='Find City'/>
							<Scene key='selectcity' component={SelectCity} title='Select City'/>
							<Scene key='settings' component={Settings} title='Settings'/>
						</Scene>
						<Scene key='errorpopup' component={ErrorPopup}/>
					</Scene>
				</RouterWithRedux>
			</Provider>
		);
	}
}
