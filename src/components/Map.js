import React, { Component } from 'react'
import * as GoogleMapAPI from '../api/GoogleMapAPI'
import Marker from './Marker'

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
    GoogleMapAPI.createGoogleMapDOM().then(this.createInitMap)
  }

  filterMarkers = (markers) => {
    const allMarkers = this.state.markers
    const filteredMarkers = []
    markers.forEach(marker => allMarkers.forEach(m =>
      (m.title === marker.title) && filteredMarkers.push(m)
    ))
    allMarkers.forEach(m =>
      filteredMarkers.includes(m) ? m.setMap(this.state.map) : m.setMap(null)
    )
  }

  infoWindowContent = (marker) => {
    // TODO: show detail via place API
    const { google, map, infoWindow, markers } = this.state
    infoWindow.setContent("<b>" + marker.title + "</b>")
    infoWindow.open(map, marker)
    marker.setAnimation(google.maps.Animation.BOUNCE)
    window.setTimeout(() => {
      marker.setAnimation(null)
    }, 800)
  }

  showInfoWindow = (marker, listItem) => {
    // Show infoWindow when clicking on marker
    if (marker !== null) {
      marker.addListener('click', () => {
        this.infoWindowContent(marker)
      })
    }
    // Show infoWindow when clicking on list item
    if (listItem !== null) {
      this.state.markers.forEach( marker => {
        (marker.title === listItem) && this.infoWindowContent(marker)
      })
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

      const tempMarkers = []
      GoogleMapAPI.getAllLocations().forEach(loc => {
        const marker = new google.maps.Marker({
          position: loc.location,
          title: loc.title
        })
        tempMarkers.push(marker)
        // Open info window
        this.setState({ markers: tempMarkers })
        this.showInfoWindow(marker, null)
      })

      this.filterMarkers(this.state.markers)
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.locations !== nextProps.locations) {
      this.filterMarkers(this.props.locations)
    }
    if (this.props.activeMarker !== nextProps.activeMarker) {
      this.showInfoWindow(null, this.props.activeMarker)
    }
  }


  render() {
    const { locations } = this.props

    return (
      <div>
        <div id="map" style={{width: '1200px', height: '600px'}}></div>
      </div>
    )
  }

  // {locations.map(marker => (
  //   <Marker
  //     key={marker.title}
  //     onClick={() => {}}
  //     marker={marker}
  //     />
  // ))}
}

export default Map
