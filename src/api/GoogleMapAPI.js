const api = 'https://maps.googleapis.com/maps/api/js'
const key = 'AIzaSyBmHl5CVuXDrPwakKYbAAFvuVlvFmRQwJ8'

const stockholmArea = [
  {title: 'Hötorgshallen', location: {lat: 59.33406, lng: 18.062898}},
  {title: 'Vasa Museum', location: {lat: 59.328023, lng: 18.091396}},
  {title: 'Djurgården', location: {lat: 59.326284, lng: 18.113215}},
  {title: 'Stockholms Gästabud', location: {lat: 59.325669, lng: 18.073964}},
  {title: 'Vete-Katten', location: {lat: 59.33411, lng: 18.058331}},
  {title: 'Hermans Vegetarian Restaurant', location: {lat: 59.317585, lng: 18.084}},
  {title: 'The Royal Palace', location: {lat: 59.326822, lng: 18.071719}},
  {title: 'Stockholm City Hall', location: {lat: 59.327451, lng: 18.054346}},
  {title: 'Radisson Blu Waterfront Hotel', location: {lat: 59.330103, lng: 18.055915}}
];

export const getAllLocations = () => stockholmArea

export const createMapDOM = () =>
  new Promise(resolve => {
    const script = document.createElement('script')
    script.src = `${api}?key=${key}&callback=initMap`
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    resolve()
  })

export const createMarkers = (arg) =>
  new Promise(resolve => {
    const { google, map } = arg.state
    const markers = []

    stockholmArea.forEach(loc => {
      const marker = new google.maps.Marker({
        position: loc.location,
        title: loc.title,
        map: map
      })
      markers.push(marker)
    })
    resolve(markers)
  })

export const filterMarkers = (arg, markers) => {
  const allMarkers = arg.state.markers
  const filteredMarkers = []

  markers.forEach(marker => allMarkers.forEach(m =>
    (m.title === marker.title) && filteredMarkers.push(m)
  ))
  allMarkers.forEach(m =>
    filteredMarkers.includes(m) ? m.setMap(arg.state.map) : m.setMap(null)
  )
}

export const showInfoWindow = (arg, marker, listItem) =>
  new Promise(resolve => {
    // Show infoWindow when clicking on marker
    marker && marker.addListener('click', () => infoWindowContent(arg, marker))
    // Show infoWindow when clicking on list item
    listItem && (
      arg.state.markers.forEach( marker => {
        (marker.title === listItem) && infoWindowContent(arg, marker)
      })
    )
    resolve(marker)
  })


const infoWindowContent = (arg, marker) => {
  const { google, map, infoWindow } = arg.state

  const title = marker.title
  const category = (marker.details) ? marker.details.category : 'category'
  const address = (marker.details) ? marker.details.address[0] : 'address'
  const city = (marker.details) ? marker.details.address[1] : 'city'
  const country = (marker.details && marker.details.address[2]) ? marker.details.address[2] : 'country'
  const icon = (marker.details) ? marker.details.icon : 'icon'

  let content = `
  <b>${title}</b>
  <p class='category'>${category}</p>
  <img src="${icon}" alt="${category}"/>
  <p>${address}</p>
  <p>${city}</p>
  <p>${country}</p>
  `
  infoWindow.setContent(content)
  infoWindow.open(map, marker)
  marker.setAnimation(google.maps.Animation.BOUNCE)
  window.setTimeout(() => {
    marker.setAnimation(null)
  }, 800)
}
