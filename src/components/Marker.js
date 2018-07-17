import React, { Component } from 'react'

class Marker extends Component {

  render() {
    const marker = this.props.marker
    return (
      <li>[Marker]{marker.title}</li>
    )
  }

}


export default Marker
