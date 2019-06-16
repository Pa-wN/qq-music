import { getVkeyUrl, getLyricUrl, getTopListUrl, getRadioListUrl, getHotkeyUrl, getRecUrl, getRankUrl ,getSearchUrl, getSongListUrl} from './music-url.js'

export function getVkey(songmid) {
    let url = getVkeyUrl(songmid)
    return fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
        return data.data.items[0].vkey
    })
}
export function getLyric(songid) {
    let url = getLyricUrl(songid)
    return fetch(url).then(res => res.json())
}

export function getHotkey() {
    return fetch(getHotkeyUrl()).then(res => res.json()).catch(err => {
        new Error(err)
    })
}
export function getRecData() {
    return fetch(getRecUrl()).then(res => res.json()).catch(err => {
        new Error(err)
    })
}
export function getRankData() {
    return fetch(getRankUrl()).then(res => res.json()).catch(err => {
        new Error(err)
    })
}
export function getSearchCon(keyWord) {
    return fetch(getSearchUrl(keyWord)).then(res => res.json())
}
export function getTopList(topId) {
    let url = getTopListUrl(topId)
    return fetch(url).then(res => res.json()).catch(err => {
        new Error(err)
    })
}
export function getSongList(id) {
    let url = getSongListUrl(id)
    return fetch(url).then(res => res.json())
}
export function getRadioList(id) {
    let url = getRadioListUrl(id)
    return fetch(url).then(res => res.json()).catch(err => {
        new Error(err)
    })
}

