import React, { Component } from 'react';
import OrderCard from '../OrderCard'
import Footer from '../Footer'

export default class Kitchen extends Component {
   constructor() {
    super()
    this.state = {
      status: ".....",
      orderObj: '{"data": [[]]}',
    }

    let em = new EventDDP('test');
    em.addListener('hello', (order) => {
      this.setState({status: "Pending!!",orderObj: order});
    });
  }
  render() {
    let {
      status,
      orderObj,
    } = this.state

    Meteor.call('getStatus', (error, result) => {
      if(status !== result){
        this.setState({status: result});
      }
    });

    return (
      <div>
        {status === 'Preparing order...' && <div onClick={() => this.done()} className='doneButton'>Done</div>}
        <h1>Kitchen Status: {status}</h1>
        <div className="orderCardContainer">
          {this.renderOrder()}
        </div>
        <Footer />
      </div>
    )
  }

  renderOrder(){
    let {
      status,
      orderObj,
    } = this.state
    const orders = JSON.parse(orderObj).data
    return orders.map((items, customerNumber) => {
      return <OrderCard
        orderNumber={customerNumber + 1}
        items={items}
      />
    })
  }

  done() {
    this.setState({
      status: ".....",
      orderObj: '{"data": [[]]}',
    });
    Meteor.call('donePreparing', (error) => {

    });
  }
}
