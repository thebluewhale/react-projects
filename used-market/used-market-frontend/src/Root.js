import React from 'react';
import { App, Write, Account, Read, MyPage, AccountConfirm } from './containers';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './Root.css';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={App} />
                    <Route path='/categoryview/:category' component={App} />
                    <Route path='/write/:isNew/:postingId' component={Write} />
                    <Route path='/account/:requestType' component={Account} />
                    <Route path='/accountconfirm/:username/:hashvalue' component={AccountConfirm} />
                    <Route path='/read/:postingItem' component={Read} />
                    <Route path='/mypage/' component={MyPage} />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default Root;
