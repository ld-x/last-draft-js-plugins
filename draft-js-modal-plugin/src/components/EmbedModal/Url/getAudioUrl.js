/* eslint no-useless-escape: 0 */

export function audioUrlValid (str) {
  var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/
  let isSoundCloudUrl = str.match(regexp) && str.match(regexp)[2]
  if (isSoundCloudUrl !== null) { return true }
  return false
}

export function resolveAudioUrl (url, cb) {
  let clientId = 'fba382dd16fff276623c38d3e3b0a709'
  let resolveUrl = `http://api.soundcloud.com/resolve.json?url=${url}/tracks&client_id=${clientId}`

  fetch(resolveUrl, {
    method: 'get'
  }).then((response) => {
    return response.json()
  }).then((track) => {
    let src = `https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${track.id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`
    cb(src)
  })
}
