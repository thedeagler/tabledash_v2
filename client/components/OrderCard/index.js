import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './styles.css'

export default class OrderCard extends Component {
  render() {
    const {
      orderNumber,
      items,
      ordering
    } = this.props

    return (
      <div className={classNames('orderCard', {ordering: ordering})}>
        <div className='orderCardHeader'>
          <h2 className='customerName'>Customer #{orderNumber}</h2>
          {this.renderOrderStatus(ordering)}
        </div>
        {
          items.map((item, i) => {
            return <div className='item' key={`item-${i}`}>{(i+1)}. {item}</div>
          })
        }
      </div>
    )
  }

  renderOrderStatus(ordering) {
    return ordering ?
      <div className='notReady'>Ordering</div>
      : <div className='ready'>Ready</div>
  }
}

OrderCard.proptypes = {
  orderNumber: PropTypes.number,
  items: PropTypes.array,
  ordering: PropTypes.bool
}
