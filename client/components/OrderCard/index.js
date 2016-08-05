import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './styles.css'

export default class OrderCard extends Component {
  render() {
    const {
      orderNumber,
      tableOrdering,
      items,
      customerOrdering,
      activateCustomer,
    } = this.props

    return (
      <div onClick={activateCustomer} className={classNames('orderCard', {disabled: !tableOrdering || customerOrdering})}>
        <div className='orderCardHeader'>
          <h2 className='customerName'>Customer #{orderNumber}</h2>
          {this.renderOrderStatus(customerOrdering, tableOrdering)}
        </div>
        {
          items.map((item, i) => {
            return <div className='item' key={`item-${i}`}>{(i+1)}. {item}</div>
          })
        }
      </div>
    )
  }

  renderOrderStatus(customerOrdering, tableOrdering) {
    if(tableOrdering) {
      return customerOrdering ?
        <div className='notReady'>Ordering</div>
        : <div className='ready'>Ready</div>
    }
  }
}

OrderCard.proptypes = {
  orderNumber: PropTypes.number,
  items: PropTypes.array,
  customerOrdering: PropTypes.bool,
  activateCustomer: PropTypes.func,
}
