import React, { Component } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom"
import AdminPageCP from "./AdminPage"
import AdminLog from "./AdminLog";


class AdminPageSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null
        };
        this.setToken = this.setToken.bind(this);
    }

    setToken(val) {
        localStorage.setItem('pas', val);
        this.setState({token: val});
    }

    render() {
        const locSetToken = this.setToken;
        const val = this.state.token;
        const wrappedAdminCP = (props) => {
            return <AdminPageCP {...props} token={val}/>
        };
        const wrappedLogin = (props) => {
            return <AdminLog {...props} setToken={locSetToken}/>
        };
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={wrappedLogin}/>
                        <Route path="/adminCP" component={wrappedAdminCP}/>
                    </Switch>

                </BrowserRouter>
            </>
        )
    }
}
export default AdminPageSignIn