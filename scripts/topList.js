class Toplist {
    constructor() {
        this.$topList = document.querySelector('.toplist')
        this.$topListUl = this.$topList.querySelector('.list')
        this.$topListImg = this.$topList.querySelector('.toplist-img')
        this.$topListBack = this.$topList.querySelector('.back')

        this.$topListBack.addEventListener('click', this.hide.bind(this))
    }
    resetTopList(options) {
        this.$topListImg.src = options.pic
        this.$topListUl.innerHTML = this.randerLi(options.songlist)
        this.show()
    }
    randerLi(songList) {
        songList = songList.slice(0, 100)
        return songList.reduce((prev, data, index, arr) => {
            let artist = data.singer.map(s => s.name).join(' ')
            return prev + `
            <li class="item">
                <a href="#player?songid=${data.songid}&artist=${artist}&songmid=${data.songmid}&songname=${data.songname}&albummid=${data.albummid}">            
                    <span class="ranking">${index + 1}</span>
                    <div class='item-info'>
                        <p class="song-name">${data.songname}</p>
                        <p class="singer">${data.singer.map(i => i.name).join('/')}</p> 
                    </div>
                </a>
            </li>
           `
        }, '')
    }
    hide() {
        this.$topList.classList.remove('show')
    }
    show() {
        this.$topList.classList.add('show')
    }
}