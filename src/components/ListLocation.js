import React, { Component } from 'react'
import './ListLocation.css'


class ListLocation extends Component {
  state = {
    filter: ''
  }

  handleChange = (e) => {
    this.setState({filter: e.target.value})
    this.props.onChange(e.target.value)
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
          {this.props.locations.map(loc => (
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
