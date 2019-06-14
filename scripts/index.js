
window.topListComp = new Toplist()
window.loadingComp = new Loading()
window.playerComp = new Player()

let recPromise = getRecData().then((json) => {
    new Recommend(json.data)
})
let rankPromise = getRankData().then((json) => {
  window.rankComp = new Rank(json.data)
})
initTab({
    link: document.querySelector('.nav-list'),
    view: document.querySelector('.main')
})
Promise.all([recPromise, rankPromise]).then(() => {
    lazyLoad(document.querySelectorAll('[data-lazyload]'))  //懒加载
})






