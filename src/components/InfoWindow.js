import React, { Component } from 'react'
import './InfoWindow.css'

class InfoWindow extends Component {
  render() {
    return (
      <span className='infoWindow'>
        <p>Title</p>
        <p>Icon</p>
        <p>Address</p>
      </span>
    )
  }
}

export default InfoWindow
