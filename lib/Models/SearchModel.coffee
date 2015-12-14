YouTube = require('youtube-node');

module.exports =
class SearchModel
    @youtube = null
    init: () ->
        @youtube = new YouTube()
        @youtube.setKey('AIzaSyAZj8aLet_vlpgn6tYW_8m3T6qmEAiILJQ')
    find: (@query, @numResults) ->
        @youtube.search @query, numResults, (error, result) ->
            if error
                console.log(error)
            else
                console.log(JSON.stringify(result, null, numResults))
