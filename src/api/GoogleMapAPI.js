const api = 'https://maps.googleapis.com/maps/api/js'
const key = 'AIzaSyBmHl5CVuXDrPwakKYbAAFvuVlvFmRQwJ8'


const locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  // {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  // {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  // {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];


const showLocationTitle = (marker) => {
  console.log(marker.title);
}

export const createGoogleMapDOM = () => {

  window.initMap = function() {
    const google = window.google
    const myTown = {lat: 40.7413549, lng: -73.9980244}
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myTown
    });

    locations.forEach( location => {
      const marker = new google.maps.Marker({
        position: location.location,
        map: map,
        title: location.title
      })

      marker.addListener('click', () => showLocationTitle(marker))
    })
  }

  const script = document.createElement('script')
  script.src = `${api}?key=${key}&callback=initMap`
  script.async = true
  script.defer = true
  document.body.appendChild(script)
}
