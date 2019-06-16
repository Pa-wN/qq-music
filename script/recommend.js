import {getRecData, getRadioList, getSongList} from './music-api.js'
import Slider from './slide.js'
import topLis from './topList.js'
import lazyLoad from './lazyload.js'
import loadingComp from './loading.js'

export default class Recommend {
    constructor() {
        this.$radio = document.querySelector("[data-radio-view]")
        this.$songList = document.querySelector("[data-hotSongList-view]")
        this.$radio.addEventListener('click', this.linkRadioList.bind(this))
        this.$songList.addEventListener('click', this.linkSongList.bind(this))

        getRecData().then((json) => {
            this.init(json.data)
        })
    }
    init({slider, radioList, songList }) {
        this.randerSlider(slider);
        this.randerRadio(radioList);
        this.randerHot(songList)
        document.querySelector('.first-loading').style.display = 'none';
        document.querySelector('.main').style.display = 'block';
    }
    randerSlider(slides) {
        new Slider({
            $el: document.querySelector('.slide-wrap'),
            slides
        })
    }
    randerRadio(radioList) {
        this.$radio.innerHTML = radioList.reduce((prev, curr) => {
            return prev + `
        <li class="item" data-id=${curr.radioid} data-picurl="${curr.picUrl}">
            <div class="item-media">
            <img src="./static/loading.gif" alt="" data-lazyload="${curr.picUrl}">
                <span class="play-btn"></span>
            </div>
            <div class="msg">
                ${curr.Ftitle}
            </div>
        </li>`
        }, '')
        lazyLoad(this.$radio.querySelectorAll('[data-lazyload]'))  //懒加载
    }
    linkRadioList(e) {
        let target = e.target
        let currentTarget = e.currentTarget
        for (; !target.matches('.item') && target != currentTarget;) {
            target = target.parentNode
        }
        loadingComp.show()
        getRadioList(target.dataset.id).then((res) => {
            let options = {}
            options.pic = target.dataset.picurl
            options.songlist = res.songlist.data.track_list.map((i) => {
                let res = {}
                res.singer = i.singer
                res.songid = i.id
                res.songmid = i.mid
                res.songname = i.name
                res.albummid = i.album.mid
                return res
            })
            topLis.resetTopList(options)
            loadingComp.hide()
        })
    }
    linkSongList(e) {
        let target = e.target
        let currentTarget = e.currentTarget
        for (; !target.matches('.item') && target != currentTarget;) {
            target = target.parentNode
        }
        loadingComp.show()
        getSongList(target.dataset.id).then((res) => {
            console.log(res)
            var options = {}
            options.pic = res.cdlist[0].logo
            options.songlist =  res.cdlist[0].songlist
            topLis.resetTopList(options)
            loadingComp.hide()
        })
    }
    randerHot(songList) {
        this.$songList.innerHTML = songList.reduce((prev, curr) => {
            return prev + `
        <li class="item" data-id="${curr.id}">
            <div class="item-media">
                <img src="./static/loading.gif" alt="" data-lazyload="${curr.picUrl}">
                <span class="play-btn"></span>
                <span class="listen-count">${this.formatNum(curr.accessnum)}</span>
            </div>
            <div class="msg">
                <p class="msg-tit ellipsis">${curr.songListDesc}</p>
                <p class="msg-text ellipsis">${curr.songListAuthor}</p>
            </div>
        </li>`
        }, '')
        lazyLoad(this.$songList.querySelectorAll('[data-lazyload]'))  //懒加载
    }
    formatNum(num) {
        if (num > 10000) {
            return (num / 10000).toFixed(1) + '万'
        } else if (num > 1000) {
            return (num / 1000).toFixed(1) + '千'
        }
        return '';
    }
}


