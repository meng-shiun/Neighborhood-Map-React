const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?'
const CLIENT_ID = 'DQBQP0GC2HOKEKB1O35AA3O5RM0GCSEV4QXHBRGOTQUAFHFV'
const CLIENT_SECRET = 'LTZSNKRMXY55YGK1GBG33PDH5BTP5ZZMBI2STPMWXCBD2YLX'

export const getPlaceInfo = (query) =>
  new Promise((resolve, reject) => {
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      ll: '59.326822, 18.071719',
      query: query,
      v: '20180323',
      limit: 1
    }

    const url = venuesEndpoint + new URLSearchParams(params)

    fetch(url)
    .then(res => res.json())
    .then(data => {
      const details = {}
      const venue = data.response.groups[0].items[0].venue
      details.category = venue.categories[0].name
      details.address = venue.location.formattedAddress
      details.icon = venue.categories[0].icon.prefix + '32' + venue.categories[0].icon.suffix
      resolve(details)
    })
    .catch(() => reject('fail to call foursquare API'))
  })
