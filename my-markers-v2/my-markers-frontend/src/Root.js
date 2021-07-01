import React from 'react';
import { App, Header, Markers, MyInfo, AboutUs, FindAccount } from './containers';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './Root.css';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route component={Header} />
                    <Route exact path='/' component={App} />
                    <Route path='/markers' component={Markers} />
                    <Route path='/myinfo' component={MyInfo} />
                    <Route path='/aboutus' component={AboutUs} />
                    <Route path='/findaccount' component={FindAccount} />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default Root;
