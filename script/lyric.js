export default class Lyric {
    constructor() {
        this.$el = document.querySelector('.lyric-list')
        this.$lyricLoading = document.querySelector('.lyric-loading')
        this.$item = []
        this.lyricList = [] // 歌词列表
        this.times = []  // 时间列表
        this.currIndex = 0 //当前歌词索引
        this.translateY = 0 // 滚动高度
        this.middle = 4  //高亮位置
        this.lyricOk = false // 是否获取到歌词
    }
    reseter(lyric) {
        this.currIndex = 0
        this.lyricList = []
        this.times = []
        this.lyricOk = false
        this.$el.innerHTML = ''
        this.$lyricLoading.style.display = 'none'
    }
    randerLyric(lyric) {
        if (!lyric) return;
        lyric = this.formatText(lyric)
        lyric.match(/^\[\d{2}:\d{2}[\.|:]\d{2}\](.+)$/gm).forEach(item => {
            this.times.push(this.formatTime(item.slice(1, 9)))
            this.lyricList.push(item.slice(10))
        })

        var html = '';
        this.lyricList.forEach(lyric => {
            html += `<li class="ellipsis">${lyric}</li>`
        })
        this.$el.innerHTML = html
        this.$item = this.$el.querySelectorAll('li')
        this.move(0)
        this.$lyricLoading.style.display = 'blick'
        this.lyricOk = true;
    }
    animation(currTime) {
        if (!currTime || !this.lyricOk) return;
        for (; currTime > this.times[this.currIndex + 1] && this.times[this.currIndex + 1];) {
            this.currIndex++
        }
        this.highlightLyric()
        if (this.currIndex > this.middle) {
            this.move(-(this.currIndex - this.middle) * 30)
        }
    }
    highlightLyric() {
        this.$el.querySelector('.active') && this.$el.querySelector('.active').classList.remove('active')
        this.$item[this.currIndex].classList.add('active')
    }
    move(height) {
        var maxHeight = this.$el.getBoundingClientRect().height - this.$el.parentNode.getBoundingClientRect().height
        if (height < -maxHeight) {
            this.$el.style.transform = `translateY(${-maxHeight}px)`;
        } else {
           this.$el.style.transform = `translateY(${height}px)`
        }
    }
    formatText(text) {
        var div = document.createElement('div')
        div.innerHTML = text
        return div.innerHTML;
    }
    formatTime(time) {
        return Number(time.split(':')[0]) * 60 + Number(time.split(':')[1])
    }
}