import React, { Component, PropTypes } from 'react'
import './styles.css'

export default class OrderCard extends Component {
  render() {
    const {
      menuState,
      submitHandler
    } = this.props

    return (
      <div className="headerWrapper">
        <div className='header'>
          <div onClick={submitHandler} className="orderButton">Place Order</div>
          <h1 className='title'>Placing Order - {this.renderMenuReadyState(menuState)}</h1>
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

OrderCard.proptypes = {
  mode: PropTypes.string,
  menuState: PropTypes.number,
  submitHandler: PropTypes.func,
}
