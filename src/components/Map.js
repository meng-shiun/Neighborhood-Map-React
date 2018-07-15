import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
import './Map.css';

const locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
];

class Map extends Component {

  state = {
    markers: locations
  }

  componentDidMount() {
    GoogleMapAPI.createGoogleMapDOM()
  }

  render() {
    const { markers } = this.state
    return (
      <div>
        <div id="map" style={{width: '100vw', height: '100vh'}}></div>
        {markers.map(marker => (
          <li key={marker.title}>{marker.title}</li>
        ))}
      </div>
    )
  }
}

export default Map
