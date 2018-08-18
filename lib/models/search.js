const youtubeNode = require('youtube-node')

class search{
    constructor(key){
        this.numberResults = 10
        this.youtube = new youtubeNode()
        this.youtube.setKey(key)
    }
    settings(data) {
        this.numberResults = data.numberResults
        this.youtube.addParam('safeSearch', data.mode)
        this.youtube.addParam('type', data.type)
    }

    find(query) {
        return new Promise((resolve, reject) => {
            this.youtube.search(query, this.numberResults, (error, result) => {
                if(error){
                    reject(error)
                    return
                }
                resolve(result.items)
            })
        })
    }
    
}


module.exports = search