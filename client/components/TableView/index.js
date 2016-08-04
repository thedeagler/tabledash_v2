import React, { Component } from 'react'
import OrderCard from '../OrderCard'
import Header from '../Header'
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
  0: 'Best fish',
  1: 'Smelly Burger',
  2: 'Super burrito',
  3: 'Square watermelon',
  4: 'Salty churro',
}

export default class TableView extends Component {
  constructor() {
    super()
    this.state = {
      menuState: 0,
      order: [[]],
      activeCustomer: 0,
    }
    this.initOrderListener()
  }

  render() {
    // const order = mockOrder
    const {
      order,
      activeCustomer,
      menuState,
    } = this.state

    return (
      <div>
        <Header menuState={menuState}/>
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
      console.log('connection open', e)
      tableView.setState({menuState: this.readyState})
      console.log('tableView.state.menuState:', tableView.state.menuState)
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
    console.log('Submit event', e)
    let orders = this.state.order.slice(0)
    orders.push([])
    console.log('this.state.activeCustomer:', this.state.activeCustomer)
    const nextCustomer = this.state.activeCustomer + 1
    console.log('this.state.activeCustomer:', this.state.activeCustomer)
    console.log('nextCustomer:', nextCustomer)
    this.setState({
      activeCustomer: nextCustomer,
      order: orders,
    })
  }
}
