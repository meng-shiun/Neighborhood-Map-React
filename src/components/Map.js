import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
import * as FoursquareAPI from '../api/FoursquareAPI'

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
        center: center,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      })

      this.setState({
        google: google,
        map: this.map,
        infoWindow: infoWindow
      })

      GoogleMapAPI.createMarkers(this).then(markers => {
        this.setState({markers: markers})
        markers.forEach(marker => {
          // Add details property to marker after fetching data from FoursquareAPI
          FoursquareAPI.getPlaceInfo(marker.title).then(data => marker.details = data)
          GoogleMapAPI.showInfoWindow(this, marker, null)
        })
      })
    }
  }

  render() {
    return (
      <section id="map"></section>
    )
  }
}

export default Map
