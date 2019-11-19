export function setUinfo ( info ) {
  return localStorage.setItem('userinfo', JSON.stringify( info ))
}

export function getUinfo () {
  return JSON.parse( localStorage.getItem('userinfo') )
}
export function clearAll () {
  return localStorage.clear()
}