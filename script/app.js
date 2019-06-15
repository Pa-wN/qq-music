import initTab from './tab.js'
import Recommend from './recommend.js'
import Rank from './ranking.js'
import Search from './search.js'
import Player from './Player.js'

new Recommend()
new Rank()
new Search()
new Player()

initTab({
    link: document.querySelector('.nav-list'),
    view: document.querySelector('.main')
})







