import React, { Component } from 'react';
import OrderCard from './components/OrderCard'

export default class Kitchen extends Component {
   constructor() {
    super()
    this.state = {
      status: ".....",
      orderObj: '{"data": [[]]}',
    }

    let em = new EventDDP('test');
    em.addListener('hello', (order) => {
    console.log("hello event fired",order);
    	this.setState({status: "Pending!!",orderObj: order});
    });
  }
  render() {
  	let {
  		status,
  		orderObj,
  	} = this.state

  	Meteor.call('getStatus', (error, result) => {

    	console.log(result);
    	if(status !== result){
    		this.setState({status: result});
      }
		});
  	
    return (
      <div>
        <div>
          <h1>Status {status}</h1>
          {this.renderOrder()}
        </div>
        <div onClick={() => this.reset()}>Reset</div>
        <div onClick={() => this.done()}>DONE</div>
      </div>
    )
  }

  renderOrder(){
    let {
      status,
      orderObj,
    } = this.state
    const orders = JSON.parse(orderObj).data
    console.log('orders', orders)
    return orders.map((items, customerNumber) => {
      return <OrderCard
        orderNumber={customerNumber}
        items={items}
      />
    })
    console.log(x)
  }

  reset() {
    this.setState({
      status: ".....",
      orderObj: "--",
    });
    Meteor.call('setStatusNoOrders', (error) => {

      console.log("Reset");
    });
  }

  done() {
    this.setState({
      status: ".....",
      orderObj: '{"data": [[]]}',
    });
    Meteor.call('donePreparing', (error) => {

      console.log("Reset");
    });
  }
}