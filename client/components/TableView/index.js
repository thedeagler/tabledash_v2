import React, { Component } from 'react'
import OrderCard from '../OrderCard'
import Header from '../Header'
import { orderStates } from '../constants.js'
import './styles.css'
// import espoly from 'event-source-polyfill'

const mockOrder = [
  [
    'Best fish',
    'Okay fries',
    'Shit dessert',
  ], [
    'Smelly Burger',
    'Big pickle',
    'So much ketchup',
  ], [
    'Brown Curry',
    'Brown Rice',
  ], [
    'Super burrito',
    'Orange sauce',
    'Salty churro',
    'Square watermelon',
  ],
]

const menu = {
  0: 'flaming hot cheetos',
  1: 'tejava',
  2: 'coke zero',
  3: 'fruit snack',
  4: 'dried seaweed',
}

export default class TableView extends Component {
  constructor() {
    super()
    this.state = {
      menuState: 0,
      orderStatus: orderStates.ORDERING,
      // order: [[]],
      order: mockOrder,
      activeCustomer: 0,
    }
    this.initOrderListener()
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
                  ordering={customerNumber === activeCustomer}
                  orderNumber={customerNumber + 1}
                  items={items}
                  key={`order${customerNumber}`}
                />
              )
            })
          }
        </div>
      </div>
    )
  }

  initOrderListener() {
    const eventSourceURL = 'https://api.particle.io/v1/devices/380052000951343334363138/events?access_token=ca15d603cdd1b53d8a5170874a8e963647c1a8de'
    const orderStream = new EventSource(eventSourceURL)
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
    console.log('update event', e)

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
    let orders = this.state.order.slice(0)
    orders.push([])
    const nextCustomer = this.state.activeCustomer + 1
    this.setState({
      activeCustomer: nextCustomer,
      order: orders,
    })
  }

  submitTableOrder() {
    const {
      order
    } = this.state

    Meteor.call('sendTableOrder', {tableOrder: order}, (err, res) => {
      if(err) {
        console.error(err)
      } else {
        console.log('Success', res)
      }
    })

    this.setState({orderStatus: orderStates.ORDER_SENT})
  }
}
