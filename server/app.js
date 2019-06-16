
const express = require('express')
const app = express();
const requires = require('request-promise')

const REC_URL = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1560055857886&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
const TOP_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1560055857898&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
const SEARCH_URL = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1560063681153&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=__searchCon__&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all'
const HOTKEY_URL = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?_=1560075802745&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
const LYRIC_URL = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=__id__&songtype=0&_=1560312690337&jsonpCallback=jsonp`
const VKey = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=__songmid__&filename=C400__songmid__.m4a&guid=2921477192`
const TOPLIST_URL = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=__topId__&_=1512563984096`
const RADIOLIST_URL = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getradiosonglist5088503485289602&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={"songlist":{"module":"pf.radiosvr","method":"GetRadiosonglist","param":{"id":__id__,"firstplay":1,"num":10}},"comm":{"ct":24,"cv":0}}`
const SONGLIST_URL = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=__id__&format=json&g_tk=5381&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
const HEADER = {
    Accept: 'application / json',
    Origin: 'https://y.qq.com',
    Referer: 'https://y.qq.com/m/index.html',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36'
}

app.get('/Rec', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: REC_URL,
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        
        res.json({ error: err.message })
    }
})
app.get('/Rank', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: TOP_URL,
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/gethoukey', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: HOTKEY_URL,
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/search', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: SEARCH_URL.replace('__searchCon__', encodeURIComponent(req.query.w)),
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/getvkey', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        var json = await requires({
            uri: VKey.replace(/__songmid__/g, encodeURIComponent(req.query.songmid)),
            json: true,
            headers: HEADER
        })
        res.json(json)
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/getLyric', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        var jsonp = await requires({
            uri: LYRIC_URL.replace('__id__', encodeURIComponent(req.query.musicid)),
            json: true,
            headers: HEADER
        })
        var json = JSON.parse(jsonp.replace(/jsonp\((.*)\)/, '$1'))
        res.json(json)
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/getTopList', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: TOPLIST_URL.replace('__topId__', encodeURIComponent(req.query.topId)),
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/getRadioList', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: RADIOLIST_URL.replace('__id__', encodeURIComponent(req.query.id)),
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.get('/getSonglist', async function handelFn(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await requires({
            uri: SONGLIST_URL.replace('__id__', encodeURIComponent(req.query.id)),
            json: true,
            headers: HEADER
        }))
    } catch (err) {
        res.json({ error: err.message })
    }
})


app.listen(3000, function () {
    console.log('loaction:3000')
})
