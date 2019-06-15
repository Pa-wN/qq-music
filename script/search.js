import {getSearchCon, getHotkey} from './music-api.js'

export default class Search {
    constructor() {
        this.$searchInp = document.getElementById('searchInp')
        this.$clearBtn = document.getElementById('clearBtn')
        this.$hotSearch = document.getElementById('hotSearch')
        this.$historySearch = document.getElementById('historySearch')
        this.$searchCon = document.getElementById('searchCon')
        this.$loading = document.querySelector('.search-loading')
        this.$hotView = document.querySelector('[data-hotSearch-view]')
        this.$HistoryView = document.querySelector('[data-history-view]')
        this.$SearchConView = document.querySelector('[data-searchCon-view]')

        this.$searchInp.addEventListener('focus', this.onInpFocus.bind(this))
        this.$searchInp.addEventListener('keyup', this.onInpkeyup.bind(this))
        this.$clearBtn.addEventListener('click', this.onClear.bind(this))
        this.$HistoryView.addEventListener('click', this.onHistoryEntrust.bind(this))
        this.$hotView.addEventListener('click', this.onHotKeyEntrust.bind(this))

        this.songData = null
        getHotkey().then((json) => {
            this.randerHotKey(json.data)
        })
    }
    // 渲染函数开始
    randerHotKey({ hotkey }) {
        this.$hotView.innerHTML = hotkey.slice(0, 6).reduce((prev, curr) => {
            return prev + `
            <li>
                ${curr.k}
            </li>`
        }, '')
    }
    randerHistory() {
        if (!this.getStorage()) return;
        this.$HistoryView.innerHTML = this.getStorage().reduce((prev, curr) => {
            return prev + `
            <li class="history-item">
                <i class="history-icon"></i>
                <p class="history-con">${curr}</p>
                <i class="history-close"></i>
            </li>`
        }, '')
    }
    randerSearchList(songList) {
        this.$SearchConView.innerHTML = songList.reduce((prev, curr) => {
            let artist = curr.singer.map(s => s.name).join(' ')
            return prev + `
        <li class="search-item">
            <a href="#player?songid=${curr.songid}&artist=${artist}&songmid=${curr.songmid}&songname=${curr.songname}&albummid=${curr.albummid}">            
                <i class="song-icon"></i>
                <div class="search-info">
                    <p class="song-name">${curr.songname}</p>
                    <p class="singer">${this.handleSingerName(curr.singer)}</p>
                </div>
            </a>
        </li>`
        }, '')
    }
    // 渲染函数结束

    onInpFocus(event) {
        this.randerHistory()
        this.$historySearch.style.display = 'block'
        this.$hotSearch.style.display = 'none'
        this.$searchCon.style.display = 'none'
    }
    onClear() {
        searchInp.value = ''
        this.$historySearch.style.display = 'none'
        this.$hotSearch.style.display = 'block'
        this.$searchCon.style.display = 'none'
    }
    onInpkeyup(event) {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            this.search(event.target.value)
        }
    }
    // 操作storage
    setStorage(str) {
        var storage = this.getStorage()
        if (!storage) {
            storage = ''
        } else {
            if (storage.includes(str)) {
                storage.splice(storage.indexOf(str), 1)
            };
            storage = ',' + storage
        }

        var text = str + storage;
        localStorage.setItem('search_history', text)
    }
    getStorage() {
        if (!localStorage.getItem('search_history')) return false;
        return localStorage.getItem('search_history').split(',')
    }
    removeStorage(str) {
        var storage = this.getStorage()
        storage.splice(storage.indexOf(str), 1)
        localStorage.setItem('search_history', storage)
    }

    // 事件代理
    onHistoryEntrust(event) {
        var currEl = event.target
        if (currEl.matches('.history-close')) {
            this.removeStorage(currEl.previousElementSibling.innerText)
            currEl.parentNode.parentNode.removeChild(currEl.parentNode)
            currEl = null
        } else if (currEl.matches('.history-con')) {
            this.search(currEl.innerText)
        }
    }
    onHotKeyEntrust(event) {
        this.search(event.target.innerText)
    }
    search(keyWord) {
        this.$searchInp.value = keyWord
        this.$historySearch.style.display = 'none'
        this.$hotSearch.style.display = 'none'
        this.$searchCon.style.display = 'block'
        this.$loading.style.display = 'block'
        getSearchCon(keyWord).then((json) => {
            this.$loading.style.display = 'none'
            this.setStorage(keyWord)
            this.randerSearchList(json.data.song.list)
        }).catch(err => {
            console.log(err)
        })
    }


    handleSingerName(singers) {
        if (singers.length === 1) return singers[0].name;
        return singers.reduce((prev, curr) => {
            return `${prev.name} / ${curr.name}`
        })
    }
}
new Search()
