const youtubeNode = require('youtube-node')

let youtube
let numberResults = { value: 10 }

const init = () => {
    youtube = new youtubeNode()
    youtube.setKey('AIzaSyAZj8aLet_vlpgn6tYW_8m3T6qmEAiILJQ')
}

const settings = data => {
    numberResults.value = data.numberResults
    youtube.addParam('safeSearch', data.mode)
    youtube.addParam('type', data.type)
}

const find = query => {
    return new Promise((resolve, reject) => {
        youtube.search(query, numberResults.value, (error, result) => {
            if(error){
                reject(error)
                return
            }
            resolve(result.items)
        })
    })
}

module.exports = { init, settings, find, _: { numberResults } }