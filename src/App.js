import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';

import {Provider} from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';
import Upload from './containers/Upload';

import Pagination from './containers/Pagination'
import Posts from './containers/Posts';
import PostsApp from './containers/PostsApp';


const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/reset-password' component={ResetPassword}/>
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
                    <Route exact path='/activate/:uid/:token' component={Activate}/>
                    <Route exact path='/upload' component={Upload}/>
                    <Route exact path='/pagination' component={Pagination}/>
                    <Route exact path='posts' component={Posts}/>
                    <Route exact path='/postsapp' component={PostsApp}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;