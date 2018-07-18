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
      this.filterMarkers(this.props.locations)
    }
    if (this.props.activeMarker !== nextProps.activeMarker) {
      GoogleMapAPI.showInfoWindow(this, null, this.props.activeMarker)
    }
  }

  createInitMap = () => {
    // TODO: move initMap to GoogleMapAPI
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

      GoogleMapAPI.createMarkers(this)
      .then( markers => {
        this.setState({markers: markers})
        markers.forEach(marker => {
          GoogleMapAPI.showInfoWindow(this, marker, null)
        })
      })

      this.filterMarkers(this.state.markers)
    }
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
    const { google, map, infoWindow } = this.state

    infoWindow.setContent("<b>" + marker.title + "</b>")
    infoWindow.open(map, marker)
    marker.setAnimation(google.maps.Animation.BOUNCE)
    window.setTimeout(() => {
      marker.setAnimation(null)
    }, 800)
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
