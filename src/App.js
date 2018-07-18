import React, { Component } from 'react'
import * as GoogleMapAPI from './api/GoogleMapAPI'
import Map from './components/Map'
import ListLocation from './components/ListLocation'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLocations: [],
      selectedMarker: '' // TODO: show infoWindow when this state changes
    }
  }

  updateListLocations = (filter) => {
    const arr = GoogleMapAPI.getAllLocations()
    let regexp

    try {
      regexp = new RegExp(filter, 'i')
    } catch(e) {
      return false
    }

    this.setState({
      displayLocations: arr.filter(loc => regexp.test(loc.title))
    })
  }

  handleListItemClick = (locationTitle) => {
    console.log('select:', locationTitle)
    this.setState({selectedMarker: locationTitle})
  }

  componentDidMount() {
    this.setState({displayLocations: GoogleMapAPI.getAllLocations()})
  }

  // componentDidUpdate(nextProps, nextState) {
  //   if (this.state.displayLocations !== nextState.displayLocations) {
  //     this.mapChange()
  //   }
  // }
  //
  // mapChange = () => {
  //   console.log('change')
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>

        <ListLocation
          locations={this.state.displayLocations}
          onChange={this.updateListLocations}
          onListItemClick={this.handleListItemClick}
          />

          <Map
            locations={this.state.displayLocations}
            onChange={this.mapChange}
            activeMarker={this.state.selectedMarker}
            />
      </div>
    );
  }
}

export default App;
