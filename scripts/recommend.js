class Recommend {
    constructor({ slider, radioList, songList }) {
        this.$radio = document.querySelector("[data-radio-view]")
        this.$radio.addEventListener('click', this.linkRadioList.bind(this))
        this.randerSlider(slider);
        this.randerRadio(radioList);
        this.randerHot(songList)
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
            topListComp.resetTopList(options)
            loadingComp.hide()
        })
    }
    randerHot(songList) {
        var $el = document.querySelector("[data-hot-view]")
        $el.innerHTML = songList.reduce((prev, curr) => {
            return prev + `
        <li class="item">
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


