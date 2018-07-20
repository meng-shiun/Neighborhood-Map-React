import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './InfoWindow.css'

export const infoWindowContent = (arg, marker) => {
  console.log('iniininin', marker);
  const { google, map, infoWindow } = arg.state

  const title = marker.title
  const category = (marker.details) ? marker.details.category : 'category'
  const address = (marker.details) ? marker.details.address[0] : 'address'
  const city = (marker.details) ? marker.details.address[1] : ''
  const country = (marker.details && marker.details.address[2]) ? marker.details.address[2] : ''
  const icon = (marker.details) ? marker.details.icon : ''

  let content = `
  <div class='iw-title'>
  <img src="${icon}" alt="${category}"/>
  <h4>${title}</h4>
  </div>
  <div class='iw-category'>${category}</div>
  <div class='address'>
  <p>${address}</p>
  <p>${city}</p>
  <p>${country}</p>
  </div>
  `

  if (document.querySelector('#info-window-wrapper')) {
    console.log('found wrapper');
    infoWindow.setContent(<InfoWindow/>)
    ReactDOM.render(<InfoWindow/>, document.getElementById('info-window-wrapper'));
  }
  // ReactDOM.render(<InfoWindow />, document.getElementById('info-window-wrapper'));
  // infoWindow.setContent(content)
  infoWindow.open(map, marker)
  marker.setAnimation(google.maps.Animation.BOUNCE)
  window.setTimeout(() => {
    marker.setAnimation(null)
  }, 800)
}

class InfoWindow extends Component {
  render() {
    return (
      <span>
        <p>Title</p>
        <p>Icon</p>
        <p>Address</p>
      </span>
    )
  }
}

export default InfoWindow
