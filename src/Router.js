import React from 'react';
import {Switch, Route} from 'react-router-dom';


import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Lists from './components/Lists';
import Items from './components/Items';


       
    export default (
    <Switch>
        <Route exact path='/login'>
            <Login />
        </Route>
        <Route exact path='/lists/:id'>
            <Lists />
        </Route>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/items/:id' component={Items} />
        <Route exact path='/'>
        <Home />
        </Route>
    </Switch>
);