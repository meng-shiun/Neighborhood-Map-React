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

  handleListClick = (loc) => {
    this.props.onListItemClick(loc.title)
  }

  render() {
    const { locations } = this.props
    return (
      <section className='list-location'>
        <div className='list-title'>
          <h1>Stockholm Highlights</h1>
        </div>
        <input
          type='text'
          value={this.state.filter}
          placeholder='Search location'
          onChange={this.handleChange}
          />
        <ul>
          {locations.map(loc => (
            <li
              key={loc.title}
              onClick={() => this.handleListClick(loc)}>
              {loc.title}
            </li>
          ))}
        </ul>
        <a href='https://developer.foursquare.com/' target='blank'>
          <img src={foursquareImg} alt='powered-by-foursquare'/>
        </a>
      </section>
    )
  }
}

export default ListLocation
