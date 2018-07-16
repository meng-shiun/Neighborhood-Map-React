import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
// import Marker from './Marker'

const locations = [
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

class Map extends Component {

  state = {
    markers: locations
  }

  componentDidMount() {
    GoogleMapAPI.createGoogleMapDOM()
      .then(() => GoogleMapAPI.createInitMap(this.state.markers))
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
