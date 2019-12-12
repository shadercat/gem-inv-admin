import React, { Component } from "react"
import {withRouter} from "react-router-dom"
import { Form, Button, Card, Table } from "react-bootstrap"
import {check} from '../functions/init';
import {getChart} from '../functions/chart'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {postPlan,getPlans} from '../functions/plan'
class AdminPlan extends Component{
    constructor(props){
        super(props);
        this.state={
            tableDataPlan: null,
        }
        this.getPlan=getPlans.bind(this);
        this.postPlan = postPlan.bind(this);
        this.onChange=this.onChange.bind(this);
        this.add=this.add.bind(this);
    }

    componentDidMount() {
        if (!this.state.tableDataPlan) {
            this.getPlan().then (resp => {
                this.setState({tableDataPlan: resp.data})
            })
        }
    }
    add(e){

        e.preventDefault();
        let o = this.state;
        this.postPlan({name:o.name, profit:o.profit, duration:o.timePlan}).then(response=>{
            let list = this.state.tableDataPlan;
            list.push(response.data);
            this.setState(
                {
                    tableDataPlan: list
                }
            )
        })

    }
    onChange(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    render() {
        const plan = this.state.tableDataPlan ? JSON.stringify(this.state.tableDataPlan) : 'waiting';
        return <><h1>Plan</h1>
            {plan}

            <Form onSubmit={this.add}>
                <Form.Control type="text" placeholder="Name " name="name" onChange={this.onChange}/>
                <Form.Control type="number" placeholder="Time " min={1} max={365} name="timePlan" onChange={this.onChange} />
                <Form.Control type="number" placeholder="Profit " step="0.01" min="0.01" max="1" name="profit" onChange={this.onChange} />
                <Button  type="submit"> Add </Button>
            </Form>
        </>

    }

}
export default AdminPlan