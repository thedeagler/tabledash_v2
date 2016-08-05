import React, { Component } from 'react'
import OrderCard from '../OrderCard'
import Header from '../Header'
import Footer from '../Footer'
import { orderStates } from '../constants.js'
import menu from '../menu.js'
import './styles.css'

let orderStream

export default class TableView extends Component {
  constructor() {
    super()
    this.state = {
      menuState: 0,
      orderStatus: orderStates.ORDERING,
      order: [[]],
      activeCustomer: 0,
    }
    this.initOrderListener()
  }

  componentDidMount() {
    let em = new EventDDP('test');
    em.addListener('done', () => {
      this.setState({orderStatus: orderStates.DELIVERING});
    });
  }

  render() {
    const {
      order,
      activeCustomer,
      menuState,
      orderStatus,
    } = this.state

    return (
      <div>
        <Header
          menuState={menuState}
          orderStatus={orderStatus}
          submitHandler={ () => {this.submitTableOrder()} }
        />
        <div className='orderCardContainer'>
          {
            order.map((items, customerNumber) => {
              return (
                <OrderCard
                  customerOrdering={customerNumber === activeCustomer}
                  tableOrdering={orderStatus === orderStates.ORDERING}
                  orderNumber={customerNumber + 1}
                  items={items}
                  activateCustomer={() => {this.changeActiveCustomer(customerNumber)}}
                  key={`order${customerNumber}`}
                />
              )
            })
          }
        </div>
        <Footer />
      </div>
    )
  }

  changeActiveCustomer(customerNumber) {
    if(customerNumber !== undefined) {
      this.setState({activeCustomer: customerNumber})
    } else {
      const nextCustomer = this.state.activeCustomer + 1
      let orders = this.state.order.slice(0)
      orders.push([])
      this.setState({
        activeCustomer: nextCustomer,
        order: orders,
      })
    }
  }

  initOrderListener() {
    const eventSourceURL = 'https://api.particle.io/v1/devices/380052000951343334363138/events?access_token=ca15d603cdd1b53d8a5170874a8e963647c1a8de'
    orderStream = new EventSource(eventSourceURL)
    const streamEvents= {
      UPDATE: '0',
      SUBMIT: '1',
    }
    const tableView = this

    orderStream.onopen = function(e) {
      tableView.setState({menuState: this.readyState})
    }

    orderStream.addEventListener(streamEvents.UPDATE, (e) => this.updateOrder(e))
    orderStream.addEventListener(streamEvents.SUBMIT, (e) => this.submitOrder(e))
  }

  updateOrder(e) {
    const customerNumber = this.state.activeCustomer
    const data = JSON.parse(e.data).data
    const items = data.split(',').reduce((customerOrder, selected, itemID) => {
      if(!!parseInt(selected)) {
        customerOrder.push(menu[itemID])
      }
      return customerOrder
    }, [])
    let newOrder = this.state.order.slice(0)
    newOrder[customerNumber] = items
    this.setState({order: newOrder})
  }

  submitOrder(e) {
    this.changeActiveCustomer()
  }

  submitTableOrder() {
    const {
      order
    } = this.state

    Meteor.call('sendTableOrder', JSON.stringify({data: order}), (err, res) => {
      if(err) {
        console.error(err)
      }
      orderStream.close()
      let finalOrder = this.state.order.slice(0, -1)
      this.setState({orderStatus: orderStates.ORDER_SENT, order: finalOrder})
    })

  }
}
