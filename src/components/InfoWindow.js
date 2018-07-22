import './InfoWindow.css'

export const displayContent = (arg, marker) => {
  const { google, map, infoWindow } = arg.state
  const title = marker.title
  const details = marker.details

  const icon = details ? details.icon : ''
  const category = details ? details.category: ''
  const address = details ? details.address[0]: ''
  const city = details ? details.address[1]: ''
  const country = details ? details.address[2] : ''

  const content = `
    <div>
      <div class='iw-title'>
        <img src=${icon} alt="${category}"/>
        <h4>${title}</h4>
      </div>
      <div class='iw-category'>${category}</div>
      <address class='iw-address'>
        <p>${address}</p>
        <p>${city}</p>
        <p>${country||''}</p>
      </address>
    </div>
  `

  infoWindow.setContent(content)
  infoWindow.open(map, marker)
  marker.setAnimation(google.maps.Animation.BOUNCE)
  window.setTimeout(() => {
    marker.setAnimation(null)
  }, 800)
}
