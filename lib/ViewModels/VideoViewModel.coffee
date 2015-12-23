{CompositeDisposable} = require 'event-kit'

module.exports =
class VideoViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model
        @width = 600
        @height = 400
        that = this
        @subscriptions = new CompositeDisposable
        @subscriptions.add @eventHandler.onVideoChange (id) -> that.model.id = id
        @subscriptions.add @eventHandler.onClear () -> that.model.id = ""

    dispose: () ->
        @subscriptions.dispose()
