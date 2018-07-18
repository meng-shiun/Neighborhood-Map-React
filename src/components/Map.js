import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
// import Marker from './Marker'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      google: [],
      map: [],
      infoWindow: [],
      markers: []
    }
  }

  componentDidMount() {
    GoogleMapAPI.createMapDOM().then(this.createInitMap)
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.locations !== nextProps.locations) {
      GoogleMapAPI.filterMarkers(this, this.props.locations)
    }
    if (this.props.activeMarker !== nextProps.activeMarker) {
      GoogleMapAPI.showInfoWindow(this, null, this.props.activeMarker)
    }
  }

  createInitMap = () => {
    window.initMap = () => {
      const google = window.google
      const infoWindow = new google.maps.InfoWindow()
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 40.7180628, lng: -73.9961237}
      })

      this.setState({
        google: google,
        map: this.map,
        infoWindow: infoWindow
      })

      GoogleMapAPI.createMarkers(this).then(markers => {
        this.setState({markers: markers})

        markers.forEach(marker => {
          GoogleMapAPI.showInfoWindow(this, marker, null)
        })
      })
    }
  }

  render() {
    const mapStyle = {width: '1400px', height: '1000px'}
    return (
      <div>
        <div id="map" style={mapStyle}></div>
      </div>
    )
  }

  // const { locations } = this.props
  // {locations.map(marker => (
  //   <Marker
  //     key={marker.title}
  //     onClick={() => {}}
  //     marker={marker}
  //     />
  // ))}
}

export default Map
