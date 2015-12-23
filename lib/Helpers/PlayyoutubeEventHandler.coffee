{Emitter} = require 'event-kit'

module.exports =
class PlayyoutubeEventHandler
    constructor: ->
        @emitter = new Emitter

    onVideoChange: (callback) ->
        @emitter.on 'play-video', callback

    VideoChange: (id) ->
        @emitter.emit 'play-video', id

    onViewVideoFrame: (callback) ->
        @emitter.on 'video-frame-visibility', callback

    viewVideoFrame: (visible) ->
        @emitter.emit 'video-frame-visibility', visible

    onViewSearchFrame: (callback) ->
        @emitter.on 'search-frame-visibility', callback

    viewSearchFrame: (visible) ->
        @emitter.emit 'search-frame-visibility', visible

    destroy: ->
        @emitter.dispose()
