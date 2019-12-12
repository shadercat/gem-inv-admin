import React, { Component } from "react"
import {withRouter} from "react-router-dom"
import { Form, Button, Card, Table } from "react-bootstrap"
import {check} from '../functions/init';
import {getChart} from '../functions/chart'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import AdminPlan from "./AdminPlan";
import Row from "react-bootstrap/Row";
class AdminPageCP extends Component {
    constructor(props) {
        super(props);
        this.state = {fetch: true, status: "init",
            message: null,
            allTime: false,
            from: null,
            to: null,
            typeOperation: 'withdraw',
            typeReport: "sum"
        };
        this.submitPayment = this.submitPayment.bind(this);
        this.check = check.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getchart = getChart;
    }

    goBack() {
        this.props.history.push('/');
    }

    switchDisable(flag) {
        document.getElementById('from').disabled = flag;
        document.getElementById('to').disabled = flag;
    }

    onChange(e) {
        let obj = {};
        if (e.target.name === "allTime") {
            this.switchDisable(e.target.checked);
        }
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    componentDidMount() {
        if (this.state.status === "init") {
            this.setState({message: null, status: "pending"});
            this.check(this.props.token? this.props.token : localStorage['pas']).then((resp) =>{
                if (resp.errors) {
                    this.setState({message: resp.errors.toString(), fetch: false, state: "done"})
                }
                else {
                    this.setState({status: true, fetch: false, state: "done"});
                }
            })
        }
    }

    submitPayment(e) {
        e.preventDefault();
        let o = this.state;
        this.getchart(o.from, o.to, o.allTime, o.typeReport, o.typeOperation).then((resp) => {
          if (resp.errors) {
              alert(resp.errors.toString());
          }  else {
              this.setState({data: resp.data});
          }
        })
    }

    render() {

        const err = this.state.message? <><Alert variant="danger"> {this.state.message}</Alert>
            <Button onClick={this.goBack} variant="secondary">Login again</Button>
        </> : "";
        const dataFunc = () => {
           let arr = [];
           if (this.state.data){
               for (let key in this.state.data){
                   let row = this.state.data[key];
                   arr.push(<tr>
                       <td>
                           {row.total}
                       </td>
                       <td>
                           {row.dayM?row.dayM.toString():''}
                       </td>
                   </tr>)
               }
           }
            return arr;
        };
        return (
            <>
                {(this.state.fetch) ? "Waiting" : (err !== "")? err :
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Home">
                        home
                    </Tab>
                    <Tab eventKey="plan" title="Plan">
                        <AdminPlan />
                    </Tab>
                    <Tab eventKey="contact" title="Payments">

                        <div style={{width: "30rem"}}>
                            <div>
                            <Form onSubmit={this.submitPayment}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId={"from"}>
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="date" value={this.state.from}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId={"to"}>
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type="date" value={this.state.to}/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId={"to"}>
                                        <Form.Label>All Time</Form.Label>
                                        <Form.Control type="checkbox" name="allTime" onChange={this.onChange} value={this.state.allTime}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row style={{margin:"0px 20px, 0px, 20px"}}>
                                    <Col sm={4}>
                                        <Form.Label >Type of operation</Form.Label>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control as="select" name='typeOperation' value={this.state.typeOperation} onChange={this.onChange}>
                                            <option value={'withdraw'}>Withdraw</option>
                                            <option value={'pay'}>Pay</option>
                                            <option value={'all'}>All</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{margin:"0px 20px, 0px, 20px"}}>
                                    <Col sm={4}>
                                        <Form.Label as={Col}>Type of report</Form.Label>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control as="select" name='typeReport' value={this.state.typeReport} onChange={this.onChange}>
                                            <option value={'sum'}>Sum</option>
                                            <option value={'daily'}>daily</option>
                                            <option value={'weekly'}>weekly</option>
                                            <option value={'monthly'}>monthly</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                                <Form.Group >
                                    <Button type="submit">Submit</Button>
                                </Form.Group>

                            </Form>

                            </div>
                        </div>
                        <Card>
                            <Card.Header>Statistics</Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Total</th>
                                        <th>Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataFunc()}
                                    </tbody>
                                </Table>
                                {/*{this.state.data? JSON.stringify(this.state.data) : ''}*/}
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs> }
            </>
        )
    }
}
export default withRouter(AdminPageCP)