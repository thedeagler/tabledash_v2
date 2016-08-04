import React, { Component, PropTypes } from 'react'
import './styles.css'

export default class OrderCard extends Component {
  render() {
    const {
      orderNumber,
      items,
      status
    } = this.props

    return (
      <div className='orderCard'>
        <div className='orderCardHeader'>
          <h2 className='customerName'>Customer #{orderNumber}</h2>
          {this.renderOrderStatus(status)}
        </div>
        {
          items.map((item, i) => {
            return <div key={`item-${i}`}>{item}</div>
          })
        }
      </div>
    )
  }

  renderOrderStatus(statusCode) {
    const orderStatus = {
      IN_PROGRESS: 0,
      COMPLETE: 1,
    }

    switch(statusCode) {
      // case orderStatus.IN_PROGRESS:
      case orderStatus.COMPLETE:
        return <div className='ready'>Ready</div>
      default:
        return <div className='notReady'>Ordering</div>
    }
  }
}

OrderCard.proptypes = {
  orderNumber: PropTypes.number,
  items: PropTypes.array,
  status: PropTypes.number
}
