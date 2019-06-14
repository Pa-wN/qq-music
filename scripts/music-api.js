function getVkey(songmid) {
    let url = getVkeyUrl(songmid)
    return fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
        return data.data.items[0].vkey
    })
    .catch(err => {
        new Error(err)
    })
 }
 function getLyric(songid) {
     let url = getLyricUrl(songid)
     return fetch(url).then(res => res.json()).catch(err => {
        new Error(err)
     })
 }

function getRecData() {
    return fetch('http://localhost:3000/Rec').then(res => res.json()).catch(err => {
        new Error(err)
     })
}
function getRankData() {
    return fetch('http://localhost:3000/Rank').then(res => res.json()).catch(err => {
        new Error(err)
     })
}
function getTopList(topId) {
    let url = getTopListUrl(topId)
    return fetch(url).then(res => res.json()).catch(err => {
        new Error(err)
     })
}

function getRadioList(id) {
    let url = getRadioListUrl(id)
    return fetch(url).then(res => res.json()).catch(err => {
        new Error(err)
     })
}
