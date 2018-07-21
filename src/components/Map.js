import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
import * as FoursquareAPI from '../api/FoursquareAPI'
import * as InfoWindow from './InfoWindow'

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
      const center = {lat: 59.326822, lng: 18.071719}
      const google = window.google
      const infoWindow = new google.maps.InfoWindow()
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center
      })

      this.setState({
        google: google,
        map: this.map,
        infoWindow: infoWindow
      })

      GoogleMapAPI.createMarkers(this).then(markers => {
        this.setState({markers: markers})

        markers.forEach(marker => {
          // Add details to marker after sending FoursquareAPI request
          GoogleMapAPI.showInfoWindow(this, marker, null)
          FoursquareAPI.getPlaceInfo(marker.title).then(data => marker.details = data)
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
}

export default Map
