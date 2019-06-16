const BASEURL = 'http://132.232.237.100:3000'
// const BASEURL = 'http://localhost:3000'
export function getRecUrl() {
    return `${BASEURL}/Rec`
}
export function getRankUrl() {
    return `${BASEURL}/Rank`
}

export function getHotkeyUrl() {
    return `${BASEURL}/gethoukey`
}

export function getPicUrl(albummid) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${albummid}.jpg`
}
export function getLyricUrl(songid) {
    return `${BASEURL}/getLyric?musicid=${songid}`
}

export function getVkeyUrl(songmid) {
    return `${BASEURL}/getvkey?songmid=${songmid}`
}
export function getSongUrl(songmid, vkey) {
    return `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=2921477192&vkey=${vkey}&uin=0&fromtag=38`
}
export function getRadioListUrl(id) {
    return `${BASEURL}/getRadioList?id=${id}`
}
export function getTopListUrl(topId) {
    return `${BASEURL}/getTopList?topId=${topId}`
}
export function getSearchUrl(keyWord) {
    return `${BASEURL}/search?w=${keyWord}`
}

export function getSongListUrl(id) {
    return `${BASEURL}/getSonglist?id=${id}`
}
