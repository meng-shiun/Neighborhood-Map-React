import React, { Component } from 'react'
import './ListLocation.css'


class ListLocation extends Component {
  state = {
    filter: '',
    getLocations: this.props.locations
  }

  handleChange = (e) => {
    const regexp = new RegExp(e.target.value, 'i')

    this.setState({filter: e.target.value})
    this.setState((state, props) => ({
      getLocations: props.locations.filter(el => regexp.test(el.title))
    }))
  }

  handleListClick = (loc) => {
    console.log('select:', loc);
  }

  render() {
    return (
      <div className='list-location'>
        <input
          type='text'
          value={this.state.filter}
          placeholder='search location'
          onChange={this.handleChange}
          />

        <p>Filter: {this.state.filter}</p>

        <ul>
          {this.state.getLocations.map(loc => (
            <li
              key={loc.title}
              onClick={() => this.handleListClick(loc)}>
              {loc.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListLocation
