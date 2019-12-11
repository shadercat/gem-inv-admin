import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Form, Button} from 'react-bootstrap';

class AdminLog extends Component {
    constructor(props){
        super(props)
        this.goTo = this.goTo.bind(this);
    }
    goTo(e){
        e.preventDefault();
        this.props.history.push("/adminCP");
    }
    render()
    {
        return (
            <Card style={{ width: "18rem" }}>
                                <Card.Header>Type your password</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.goTo}>
                                        <Form.Group>
                                            <Form.Control type="password" placeholder="password" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">Submit</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
        )
    }
}

export default withRouter(AdminLog);