class Lyric {
    constructor({ $el }) {
        this.$el = $el
        this.$item = []
        this.lyricList = [] // 歌词列表
        this.times = []  // 时间列表
        this.currInder = 0 //当前歌词索引
        this.translateY = 0 // 滚动高度
        this.middle = 4  //高亮位置
    }
    reseter(lyric) {
        this.currInder = 0
        this.lyricList = []
        this.times = []
        this.handleLyric(lyric)
        this.randerLyric()
    }
    handleLyric(lyric) {
        lyric = this.formatText(lyric)
        lyric.match(/^\[\d{2}:\d{2}\.\d{2}\](.+)$/gm).forEach(item => {
            this.times.push(this.formatTime(item.slice(1, 9)))
            this.lyricList.push(item.slice(10))
        })
    }
    randerLyric() {
        var html = '';
        this.lyricList.forEach(lyric => {
            html += `<li class="ellipsis">${lyric}</li>`
        })
        this.$el.innerHTML = html
        this.$item = this.$el.querySelectorAll('li')
        this.move(0)
    }
    animation(currTime) {
        if (!currTime) return;
        for (; currTime > this.times[this.currInder + 1] && this.times[this.currInder + 1];) {
            this.currInder++
        }
        this.highlightLyric()
        if (this.currInder > this.middle) {
            this.move(-(this.currInder - this.middle) * 30)
        }
    }
    highlightLyric() {
        this.$el.querySelector('.active') && this.$el.querySelector('.active').classList.remove('active')
        this.$item[this.currInder].classList.add('active')
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