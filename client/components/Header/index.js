import React, { Component, PropTypes } from 'react'
import { orderStates } from '../constants.js'
import './styles.css'

export default class Header extends Component {
  render() {
    const {
      menuState,
      orderStatus,
      submitHandler
    } = this.props

    let titleBar
    switch (orderStatus) {
      case orderStates.ORDER_SENT:
        titleBar = <h1 className='title' key="title">Order Placed!</h1>
        break;
      case orderStates.ORDERING:
      default:
        titleBar = [
          <div onClick={submitHandler} className="orderButton" key="orderButton">Place Order</div>,
          <h1 className='title' key="title">Placing Order - {this.renderMenuReadyState(menuState)}</h1>,
        ]
        break;
    }

    return (
      <div className="headerWrapper">
        <div className='header'>
          {titleBar}
        </div>
      </div>
    )
  }

  renderMenuReadyState(readyState) {
    switch(readyState) {
      case 1:
        return <span className='menuReady'>Ready to order</span>
      case 2:
        return <span className='menuSent'>Order placed</span>
      default:
        return <span className='menuConnecting'>Connecting menus</span>
    }
  }
}

Header.proptypes = {
  mode: PropTypes.string,
  menuState: PropTypes.number,
  orderStatus: PropTypes.number,
  submitHandler: PropTypes.func,
}
