import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import * as GoogleMapAPI from './api/GoogleMapAPI'
import Map from './components/Map'
import ListLocation from './components/ListLocation'
import BurgerMenu from './components/BurgerMenu'

import './App.css'

class App extends Component {
  state = {
    displayLocations: [],
    selectedListItem: '',
    isListOpen: false
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

  toggleListLocation = () => {
    this.setState({ isListOpen: !this.state.isListOpen })
  }

  componentDidMount() {
    this.setState({ displayLocations: GoogleMapAPI.getAllLocations() })
  }

  render() {
    const { displayLocations, selectedListItem, isListOpen } = this.state

    return (
      <main className="App">
        <div className="burgerMenu-wrapper">
          <BurgerMenu onMenuClick={this.toggleListLocation}/>
        </div>

        <BurgerMenu onMenuClick={this.toggleListLocation}/>

        <CSSTransitionGroup
          transitionName="slide-list"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          >
          {isListOpen && (
            <ListLocation
              locations={displayLocations}
              onChange={this.updateListLocations}
              onListItemClick={this.handleListItemClick}
            />
          )}
        </CSSTransitionGroup>

        <Map
          locations={displayLocations}
          activeMarker={selectedListItem}
        />

      </main>
    );
  }
}

export default App;
