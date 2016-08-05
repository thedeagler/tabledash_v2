import React, { Component } from 'react';

export default class Kitchen extends Component {
   constructor() {
    super()
    this.state = {
      status: ".....",
      orderString: "--",
    }

    let em = new EventDDP('test');
    em.addListener('hello', (order) => {
    console.log("hello event fired",order);
    	this.setState({status: "Pending!!",orderString: order});
    });
  }
  render() {
  	let {
  		status,
  		orderString,
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
          <p>{orderString}</p>
        </div>
      </div>
    )
  }
}