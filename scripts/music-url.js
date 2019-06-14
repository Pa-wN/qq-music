function getPicUrl(albummid) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${albummid}.jpg`
}
function getLyricUrl(songid) {
    return `http://localhost:3000/getLyric?musicid=${songid}`
}

function getVkeyUrl(songmid) {
    return `http://localhost:3000/getvkey?songmid=${songmid}`
}
function getSongUrl(songmid, vkey) {
    return `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=2921477192&vkey=${vkey}&uin=0&fromtag=38`
}
function getRadioListUrl(id) {
    return `http://localhost:3000/getRadioList?id=${id}`
}
function getTopListUrl(topId) {
return `http://localhost:3000/getTopList?topId=${topId}`

}
