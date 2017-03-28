/* eslint no-useless-escape: 0 */

function getVideoIdYoutube (str) {
  // link : https://youtube.com/watch?v=HBHJ0XGZfLs
  // share : https://youtu.be/HBHJ0XGZfLs
  // embed : https://youtube.com/embed/HBHJ0XGZfLs
  var re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i
  var matches = re.exec(str)
  return matches && matches[1]
}

function getVideoIdVimeo (str) {
  // embed & link: https://vimeo.com/713300
  var re = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i
  var matches = re.exec(str)
  return matches && matches[1]
}

export default function getVideoUrl (src) {
  /* youtube */
  let id = getVideoIdYoutube(src)
  if (id !== null) {
    return `https://youtube.com/embed/${id}`
  }

  /* vimeo */
  id = getVideoIdVimeo(src)
  if (id !== null) {
    return `https://player.vimeo.com/video/${id}`
  }

  return undefined
}
