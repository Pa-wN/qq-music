import { getRankData , getTopList} from './music-api.js'
import topList from './topList.js'
import lazyLoad from './lazyload.js'
import loadingComp from './loading.js'

export default class Rank {
    constructor() {
        this.$el = document.querySelector('.rank-view');
        this.$list = document.querySelector("[data-rankList-view]")
        getRankData().then((json) => {
            this.initRank(json.data.topList)
        })
        this.$list.addEventListener('click', this.linkTopList.bind(this))
    }
    initRank(rankList) {
        this.$list.innerHTML = rankList.reduce((prev, curr) => {
            return prev + `
            <li class="topic-item" data-id=${curr.id}>
                <div class="item-media">
                    <img src="./static/loading.gif" alt="" data-lazyload="${curr.picUrl}">
                    <div class="listen-count">${curr.accessnum}</div>
                </div>
                <div class="item-info">
                    <h2 class="item-title">${curr.topTitle}</h2>
                    <ul class="item-cont">${this.childView(curr.songList)}
                    </ul>
                </div>
                <div class="topic-more"></div>
            </li>`
        }, '')
        lazyLoad(this.$list.querySelectorAll('[data-lazyload]'))  //懒加载
    }
    linkTopList(e) {
        let target = e.target
        let currentTarget = e.currentTarget
        for (; !target.matches('.topic-item') && target != currentTarget;) {
            target = target.parentNode
        }
        loadingComp.show()
        getTopList(target.dataset.id).then((res) => {
            var options = {}
            options.pic = res.topinfo.pic_v12
            options.songlist = res.songlist.map(i => i.data)
            topList.resetTopList(options)
            loadingComp.hide()
        })
    }
    childView(lists) {
        return lists.reduce((prev, curr, index, arr) => {
            return prev +
                `
            <li class="item-song ellipsis">
                ${index + 1}
                <span class="song-name">${curr.songname}</span>
                ${curr.singername}
            </li>
        `}, '')
    }
}
