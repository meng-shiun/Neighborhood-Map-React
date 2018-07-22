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
    this.props.onListItemClick(loc.title)
  }

  render() {
    const { locations } = this.props
    return (
      <section className='list-location'>
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
      </section>
    )
  }
}

export default ListLocation
