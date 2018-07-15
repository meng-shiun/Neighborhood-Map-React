import React, { Component } from 'react'
import Map from './components/Map'
import SearchBar from './components/SearchBar'
import ListLocation from './components/ListLocation'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>

        <SearchBar/>
        <ListLocation/>
        <Map/>
      </div>
    );
  }
}

export default App;
