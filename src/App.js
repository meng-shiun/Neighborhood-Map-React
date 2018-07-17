import React, { Component } from 'react'
import * as GoogleMapAPI from './api/GoogleMapAPI'
import Map from './components/Map'
import ListLocation from './components/ListLocation'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLocations: []
    }
  }

  updateListLocations = (filter) => {
    const regexp = new RegExp(filter, 'i')
    const arr = GoogleMapAPI.getAllLocations()
    this.setState({
      displayLocations: arr.filter(loc => regexp.test(loc.title))
    })
  }

  componentDidMount() {
    this.setState({displayLocations: GoogleMapAPI.getAllLocations()})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>

        {this.state.displayLocations && (this.state.displayLocations.map(c => (
          <h4 key={c.title}>{c.title}</h4>
        )))}
        <ListLocation
          locations={this.state.displayLocations}
          onChange={this.updateListLocations}
          />
      </div>
    );
  }
}

// <Map
//   locations={this.state.displayLocations}
//   />
export default App;
