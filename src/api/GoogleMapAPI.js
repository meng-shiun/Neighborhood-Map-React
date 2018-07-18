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


// TODO: show detail via place API
const infoWindowContent = (arg, marker) => {
  const { google, map, infoWindow } = arg.state

  infoWindow.setContent("<b>" + marker.title + "</b>")
  infoWindow.open(map, marker)
  marker.setAnimation(google.maps.Animation.BOUNCE)
  window.setTimeout(() => {
    marker.setAnimation(null)
  }, 800)
}
