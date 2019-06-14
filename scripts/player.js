class Player {
    constructor() {
        this.$el = document.querySelector('.player')
        this.$toggleBtn = $el.querySelector('.toggle-btn')
        this.$pic = $el.querySelector('.song-pic')
        this.$playerBg = $el.querySelector('.player-bg')
        this.$up = $el.querySelector('.up')
        this.$songName = $el.querySelector('.song-name')
        this.$singer = $el.querySelector('.singer')
        this.$lyricCon = $el.querySelector('.lyric-list')
        this.$progress = $el.querySelector('.progress')
        this.$audio = $el.querySelector('#audio')
        this.progressComp = new ProgressBar({ $el: this.$progress })
        this.lyricComp = new Lyric({ $el: this.$lyricCon })
        this.$phonogram = document.querySelector('.player-open')

        this.$audio.addEventListener('timeupdate', this.timeupdate.bind(this))
        this.$toggleBtn.addEventListener('click', this.toggleSong.bind(this))
        this.$up.addEventListener('click', this.hide.bind(this))
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        this.$phonogram.addEventListener('click', this.show.bind(this))
    }
    timeupdate(e) {
        let target = e.target
        this.progressComp.onPlaying({
            currentTime: target.currentTime,
            songTime: target.duration
        })
        this.lyricComp.animation(target.currentTime)
    }
    reseter({ songid, songname, songmid, albummid, artist }) {
        this.$phonogram.style.display = 'block'
        this.$phonogram.querySelector('img').src = getPicUrl(albummid)
        this.progressComp.reseter()
        this.$pic.src = getPicUrl(albummid)
        this.$playerBg.style.backgroundImage = `url('${getPicUrl(albummid)}')`
        this.$songName.innerText = songname
        this.$singer.innerText = artist
        getVkey(songmid).then((vkey) => {
            this.$audio.src = getSongUrl(songmid, vkey)
        })
        getLyric(songid).then(data => {
            this.lyricComp.reseter(data.lyric)
            this.play()
        })
    }
    onHashChange() {
        let hash = location.hash
        if (/^#player\?.+/.test(hash)) {
            console.log(123)
            let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
            let options = matches && matches.reduce((res, cur) => {
                let arr = cur.split('=')
                res[arr[0]] = decodeURIComponent(arr[1])
                return res
            }, {})
            this.show()
            this.reseter(options)
        } else {
            this.hide()
        }
    }
    toggleSong(e) {
        let target = e.target
        if (target.matches('.play')) {
            this.pause()
        } else {
            this.play()
        }
    }
    play() {
        this.$audio.play()
        this.$toggleBtn.classList.add('play')
        this.$phonogram.classList.add('play')
    }
    pause() {
        this.$audio.pause()
        this.$toggleBtn.classList.remove('play')
        this.$phonogram.classList.remove('play')
    }
    show() {
        this.$el.classList.add('show')
    }
    hide() {
        this.$el.classList.remove('show')
    }
}
