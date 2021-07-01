import React from 'react';
import { App, Markers } from './containers';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './Root.css';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={App} />
                    <Route path='/markers' component={Markers} />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default Root;
