import React, { Component, PropTypes } from 'react'
import './styles.css'

export default class OrderCard extends Component {
  render() {
    const {
      menuState
    } = this.props

    return (
      <div className='header'>
        <div className="orderButton">Place Order</div>
        <h1 className='title'>Placing Order - {this.renderMenuReadyState(menuState)}</h1>
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

OrderCard.proptypes = {
  mode: PropTypes.string,
  menuState: PropTypes.number,
}
