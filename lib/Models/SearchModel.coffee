YouTube = require 'youtube-node'

module.exports =
class SearchModel
    @youtube = null

    init: () ->
        @youtube = new YouTube()
        @youtube.setKey('AIzaSyAZj8aLet_vlpgn6tYW_8m3T6qmEAiILJQ')

    find: (query, numResults) ->
        that = this
        return new Promise (resolve, reject) ->
            that.youtube.search query, numResults, (error, result) ->
                if error
                    reject error
                else
                    resolve result.items