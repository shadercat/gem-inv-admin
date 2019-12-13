import React, { Component } from "react"
import {withRouter} from "react-router-dom"
import { Form, Button, Card, Table } from "react-bootstrap"
import Plan from './Plan';
import {check} from '../functions/init';
import {getChart} from '../functions/chart'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {postPlan,getPlans} from '../functions/plan'
import {forEach} from "react-bootstrap/esm/ElementChildren";
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
        var plan = this.state.tableDataPlan ? JSON.stringify(this.state.tableDataPlan) : 'waiting';
        if(this.state.tableDataPlan){
            var planList = (this.state.tableDataPlan.map((item,i) => <Plan item={item} key={i}/>));
        }
        return <div>
                    <h1>Plan</h1>
            <div style={{display: "flex", justifyContent: "center", justifyItems: "center"}}>
            <div style={{display: "grid", gridTemplateColumns: 30 +'vw ' + 30 + 'vw ' + 30 + 'vw', gridGap: 1 + 'em'}}>
            {planList}
            </div>
                </div>
                <div style={{margin: 3 + 'em auto', padding: '3em 20em'}}>
                <Form onSubmit={this.add}>
                <Form.Control type="text" placeholder="Name " name="name" onChange={this.onChange}/>
                <Form.Control type="number" placeholder="Time " min={1} max={365} name="timePlan" onChange={this.onChange} />
                <Form.Control type="number" placeholder="Profit " step="0.01" min="0.01" max="1" name="profit" onChange={this.onChange} />
                <br/>
                <Button  type="submit"> Add </Button>
                </Form>
                </div>
        </div>

    }

}
export default AdminPlan