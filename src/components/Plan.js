import React, {Component} from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';

class Plan extends Component{
    constructor(props){
        super(props);


    }

    render(){
        return(
            <Card>
                <Card.Header>{this.props.item.name}</Card.Header>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{this.props.item.duration.toString()}</ListGroupItem>
                    <ListGroupItem>{parseFloat(this.props.item.profit.$numberDecimal).toString()}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Edit</Card.Link>
                    <Card.Link href="#" onClick={()=>this.props.delete(this.props.item)}>Delete</Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

export default Plan;
