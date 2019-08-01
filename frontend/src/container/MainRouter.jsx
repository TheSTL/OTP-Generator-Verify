import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import Nav from '../components/Nav'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'

export default class MainRouter extends Component {
    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/login' component={LoginPage} />
                    <Route exact path='/dashboard' component={Dashboard} />
                    
                </Switch>
            </Router>
        )
    }
}
