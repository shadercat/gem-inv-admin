import React, { Component } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom"
import AdminPageCP from "./AdminPage"
import AdminLog from "./AdminLog";


class AdminPageSignIn extends Component {
    constructor(props) {
        super(props)
    
    }
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <AdminLog/>
                        </Route>
                        <Route path="/adminCP" component={AdminPageCP}>
                            
                        </Route>
                    </Switch>

                </BrowserRouter>
            </>
        )
    }
}
export default AdminPageSignIn