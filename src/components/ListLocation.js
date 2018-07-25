import React, { Component } from 'react'
import './ListLocation.css'
import foursquareImg from '../images/powered-by-foursquare.svg'

class ListLocation extends Component {
  state = {
    filter: ''
  }

  handleChange = (e) => {
    this.setState({filter: e.target.value})
    this.props.onChange(e.target.value)
  }

  handleListClick = (e, loc) => {
    (!e.keyCode || e.keyCode === 13 || e.keyCode === 32) &&
      this.props.onListItemClick(loc.title)
  }

  render() {
    const { locations, isTabPressed } = this.props

    let inputClassName = 'no-focus-outline'
    isTabPressed && (inputClassName = '')

    let itemClassName = ''
    isTabPressed && (itemClassName = 'loc-item')

    return (
      <section className='list-location'>
        <header className='list-title'>
          <h1 id='header'>Stockholm Highlights</h1>
        </header>

        <input
          className={inputClassName}
          type='search'
          value={this.state.filter}
          placeholder='Search location'
          onChange={this.handleChange}
          aria-label='Search location in Stockholm'
          />

        <ul aria-labelledby='header'>
          {locations.map(loc => (
            <li
              className={itemClassName}
              key={loc.title}
              onClick={(e) => this.handleListClick(e, loc)}
              onKeyDown={(e) => this.handleListClick(e, loc)}
              tabIndex='0'
              >
              {loc.title}
            </li>
          ))}
        </ul>

        <a
          href='https://developer.foursquare.com/'
          target='blank'
          tabIndex='0'
          aria-label='Visit Foursquare page'>
          <img src={foursquareImg} alt='powered-by-foursquare'/>
        </a>
      </section>
    )
  }
}

export default ListLocation
