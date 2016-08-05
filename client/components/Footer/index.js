import React, { Component, PropTypes } from 'react'
import './styles.css'

const logo = (
  <svg width={50} height={21} className='logo'>
    <path d="M25.2,6H6.8l3,3h19.7C28.9,7.3,27.2,6,25.2,6z" />
    <path d="M29.5,12H12.8l3,3h9.4C27.2,15,28.9,13.7,29.5,12z" />
    <path d="M25.2,0H0.8l3,3h21.5c4.1,0,7.5,3.4,7.5,7.5c0,4.1-3.4,7.5-7.5,7.5h-6.5l3,3h3.5c5.8,0,10.5-4.7,10.5-10.5 C35.8,4.7,31,0,25.2,0z" />
    <path d="M39.5,6H38c0.3,1,0.6,2,0.7,3h5.1C43.1,7.3,41.5,6,39.5,6z" />
    <path d="M43.7,12h-5.1c-0.1,1-0.3,2-0.7,3h1.5C41.5,15,43.1,13.7,43.7,12z" />
    <path d="M39.5,0h-5.8c1.1,0.9,2,1.9,2.7,3h3c4.1,0,7.5,3.4,7.5,7.5c0,4.1-3.4,7.5-7.5,7.5h-3c-0.8,1.1-1.7,2.1-2.7,3 h5.8C45.3,21,50,16.3,50,10.5C50,4.7,45.3,0,39.5,0z" />
  </svg>
)

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>Powered by {logo}  DoorDash</div>
    )
  }
}
