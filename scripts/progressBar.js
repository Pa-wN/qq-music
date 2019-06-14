class ProgressBar {
    constructor({ $el, songTime }) {
        this.$songTime = $el.querySelector('.song-time')
        this.$playTime = $el.querySelector('.play-time')
        this.$progress = $el.querySelector('.progress-bar-progress')
    }

    onPlaying({ currentTime, songTime }) {
        this.$progress.style.width = `${currentTime / songTime * 100}%`
        currentTime = this.formatTime(currentTime)
        songTime = this.formatTime(songTime)
        this.$songTime.innerText = songTime
        this.$playTime.innerText = currentTime
    }
    reseter() {
        this.$progress.style.width = 0
        this.$songTime.innerText = '00: 00'
        this.$playTime.innerText = '00: 00'
    }
    formatTime(time) {
        // time = parseInt(time)
        var minute = parseInt(time / 60) || 0
        minute = minute >= 10 ? minute : '0' + minute
        var second = parseInt(time % 60) || 0
        second = second >= 10 ? second : '0' + second
        return minute + ':' + second
    }
}