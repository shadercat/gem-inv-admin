import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {login} from '../functions/init'

class AdminLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            fetch: false,
            errors: null
        };
        this.goTo = this.goTo.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.login = login.bind(this);
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    goTo(e){
        e.preventDefault();
        this.setState({fetch: true, errors: null});
        this.login(this.state.password).then(resp => {
            if (resp.errors) {
                this.setState({fetch: false, errors: resp.errors});
            }
            else {
                this.props.setToken(resp.data);
                this.props.history.push("/adminCP");
            }

        });
    }

    render()
    {
        const fault = this.state.errors? <Alert variant="danger">{this.state.errors}</Alert> : "";
        return (
            <Card style={{ width: "18rem" }}>
                                <Card.Header>Type your password</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.goTo}>
                                        <Form.Group>
                                            <Form.Control type="password" onChange={this.changePassword} placeholder="password" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">Submit</Button>
                                    </Form>

                                </Card.Body>
                {fault}
            </Card>
        )
    }
}

export default withRouter(AdminLog);