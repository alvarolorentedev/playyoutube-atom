{Emitter} = require 'event-kit'

module.exports =
class PlayyoutubeEventHandler
    constructor: ->
        @emitter = new Emitter

    onVideoChange: (callback) ->
        @emitter.on 'play-video', callback

    VideoChange: (id) ->
        @emitter.emit 'play-video', id

    onClear: (callback) ->
        @emitter.on 'clear-control', callback

    clear: () ->
        @emitter.emit 'clear-control'

    onViewVideoFrame: (callback) ->
        @emitter.on 'video-frame-visibility', callback

    viewVideoFrame: (visible) ->
        @emitter.emit 'video-frame-visibility', visible

    onViewSearchFrame: (callback) ->
        @emitter.on 'search-frame-visibility', callback

    viewSearchFrame: (visible) ->
        @emitter.emit 'search-frame-visibility', visible

    onVideoSettingsChange: (callback) ->
        @emitter.on 'video-settings-change', callback

    videoSettingsChange: (settings) ->
        @emitter.emit 'video-settings-change', settings

    onSearchSettingsChange: (callback) ->
        @emitter.on 'search-settings-change', callback

    searchSettingsChange: (settings) ->
        @emitter.emit 'search-settings-change', settings

    destroy: ->
        @emitter.dispose()
