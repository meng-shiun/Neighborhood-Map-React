import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
// import Marker from './Marker'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: props.locations
    }
    this.test()
  }

  test = () => {
    console.log('[MAP]', this.state.markers);
  }

  componentDidMount() {
    GoogleMapAPI.createGoogleMapDOM()
      .then(() => GoogleMapAPI.createInitMap(this.props.locations))
  }

  render() {
    const { locations } = this.props
    return (
      <div>
        <div id="map" style={{width: '100vw', height: '100vh'}}></div>
        {locations.map(marker => (
          <li key={marker.title}>{marker.title}</li>
        ))}
      </div>
    )
  }
}

export default Map
