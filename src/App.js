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
    isListOpen: false,
    isTabPressed: false // For Ally
  }

  componentDidMount() {
    this.setState({ displayLocations: GoogleMapAPI.getAllLocations() })

    window.addEventListener('keyup', this.showFocusRing)
    window.addEventListener('click', this.hideFocusRing)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.showFocusRing)
    window.removeEventListener('click', this.hideFocusRing)
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

  showFocusRing = (e) => {
    e.keyCode === 9 && this.setState({isTabPressed: true})
  }

  hideFocusRing = (e) => {
    this.setState({isTabPressed: false})
  }

  render() {
    const { displayLocations, selectedListItem, isListOpen } = this.state

    return (
      <main className="App">
        <div className="burgerMenu-wrapper">
        </div>

        <nav>
          <BurgerMenu
            isTabPressed={this.state.isTabPressed}
            tabIndex="0"
            onMenuClick={this.toggleListLocation}
          />

          <CSSTransitionGroup
            transitionName="slide-list"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            >
            {isListOpen && (
              <ListLocation
                isTabPressed={this.state.isTabPressed}
                locations={displayLocations}
                onChange={this.updateListLocations}
                onListItemClick={this.handleListItemClick}
              />
            )}
          </CSSTransitionGroup>
        </nav>

        <Map
          locations={displayLocations}
          activeMarker={selectedListItem}
        />

      </main>
    );
  }
}

export default App;
