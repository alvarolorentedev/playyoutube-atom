YouTube = require 'youtube-node'

module.exports =
class SearchModel
    @youtube = null
    @numberResults = 10

    init: () ->
        @youtube = new YouTube()
        @youtube.setKey('AIzaSyAZj8aLet_vlpgn6tYW_8m3T6qmEAiILJQ')

    settings: (settings) ->
       @numberResults = settings.numberResults
       @youtube.addParam 'safeSearch', settings.mode
       @youtube.addParam 'type', settings.type

    find: (query) ->
        return new Promise (resolve, reject) =>
            @youtube.search query, @numberResults, (error, result) ->
                if error
                    reject error
                else
                    resolve result.items
