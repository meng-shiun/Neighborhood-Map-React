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
    .then(this.createInitMap)
  }

  filterMarkers = (markers) => {
    const allMarkers = this.state.markers
    const filteredMarkers = []

    markers.forEach(marker => allMarkers.forEach(m =>
      (m.title === marker.title) && filteredMarkers.push(m)
    ))

    allMarkers.forEach(m =>
      filteredMarkers.includes(m) ? m.setMap(this.map) : m.setMap(null)
    )
  }

  showInfoWindow = (marker) => {
    // TODO: InfoWindow
    console.log('show info window', marker);
  }

  createInitMap = () => {
    window.initMap = () => {
      const google = window.google
      const infoWindow = new google.maps.InfoWindow()
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 40.7180628, lng: -73.9961237}
      })

      const tempMarkers = []
      GoogleMapAPI.getAllLocations().forEach(loc => {
        const marker = new google.maps.Marker({
          position: loc.location,
          title: loc.title
        })
        tempMarkers.push(marker)
        // Open info window
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.setContent("<b>" + marker.title + "</b>")
          infoWindow.open(this.map, marker)
          marker.setAnimation(google.maps.Animation.BOUNCE)
          window.setTimeout(() => {
            marker.setAnimation(null)
          }, 800)
        })
      })

      this.setState({ markers: tempMarkers })
      this.filterMarkers(this.state.markers)
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.locations !== nextProps.locations) {
      this.filterMarkers(this.props.locations)
    }
  }

  render() {
    const { locations } = this.props

    return (
      <div>
        <div id="map" style={{width: '1200px', height: '600px'}}></div>
        {locations.map(marker => (
          <Marker
            key={marker.title}
            onClick={this.showInfoWindow}
            marker={marker}
            />
        ))}
      </div>
    )
  }
}

export default Map
