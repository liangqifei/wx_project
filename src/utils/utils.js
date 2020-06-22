export function setLocal(key, value) {
  // if (navigator.userAgent.indexOf('Html5Plus') > -1){
  //   try {
  //     plus.storage.setItem(key, JSON.stringify(value))
  //   } catch (e) {
  //     plus.storage.setItem(key, value)
  //   }
  // }else{
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      localStorage.setItem(key, value)
    }
  // }
  
}

export function getLocal(key) {
  if (key) {
    let lr=''
    // if (navigator.userAgent.indexOf('Html5Plus') > -1){
    //   lr = plus.storage.getItem(key)
    // }else{
      lr= localStorage.getItem(key)
    // }
    try {
      return lr ? JSON.parse(lr) : ''
    } catch (e) {
      return ''
    }
  }
}
export function escape2Html(str) {
  var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
}
