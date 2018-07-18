import React, { Component } from 'react'

class Marker extends Component {

  handleClick = (marker) => {
    this.props.onClick(marker)
  }

  render() {
    const marker = this.props.marker
    return (
      <li onClick={() => this.handleClick(marker)}>[Marker]{marker.title}</li>
    )
  }

  // render() {
  //   const marker = this.props.marker
  //   return (
  //     <li onClick={() => this.handleClick(marker)}>[Marker]{marker.title}</li>
  //   )
  // }
}


export default Marker
