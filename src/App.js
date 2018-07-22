import React, { Component } from 'react'
import * as GoogleMapAPI from './api/GoogleMapAPI'
import Map from './components/Map'
import ListLocation from './components/ListLocation'

import './App.css'

class App extends Component {
  state = {
    displayLocations: [],
    selectedListItem: ''
  }

  updateListLocations = (filter) => {
    const arr = GoogleMapAPI.getAllLocations()
    let regexp

    try { regexp = new RegExp(filter, 'i') }
    catch(e) { return false }

    this.setState({
      displayLocations: arr.filter(loc => regexp.test(loc.title))
    })
  }

  handleListItemClick = (locationTitle) => {
    this.setState({selectedListItem: locationTitle})
  }

  componentDidMount() {
    this.setState({displayLocations: GoogleMapAPI.getAllLocations()})
  }

  render() {
    return (
      <main className="App">
        <header className="App-header">
          <h1 className="App-title">Stockholm Highlights</h1>
        </header>

        <ListLocation
          locations={this.state.displayLocations}
          onChange={this.updateListLocations}
          onListItemClick={this.handleListItemClick}
        />

        <Map
          locations={this.state.displayLocations}
          activeMarker={this.state.selectedListItem}
        />
      </main>
    );
  }
}

export default App;
