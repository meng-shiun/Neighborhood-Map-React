import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
import Marker from './Marker'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
  }

  componentDidMount() {
    GoogleMapAPI.createGoogleMapDOM()
      .then(() => GoogleMapAPI.createInitMap(this.props.locations))
  }

  // componentDidUpdate(nextProps, nextState) {
  //   if (this.props.locations !== nextProps.location) {
  //     console.log('update');
  //     GoogleMapAPI.createGoogleMapDOM()
  //       .then(() => this.showGoogleMap())
  //   }
  // }
  //
  // showGoogleMap = () => {
  //   GoogleMapAPI.createInitMap(this.props.locations)
  // }


  render() {
    const { locations } = this.props

    return (
      <div>
        <div id="map" style={{width: '100vw', height: '100vh'}}></div>
        {locations.map(marker => (
          <Marker key={marker.title} marker={marker}/>
        ))}
      </div>
    )
  }
}

export default Map
