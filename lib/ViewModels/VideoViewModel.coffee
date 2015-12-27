{CompositeDisposable} = require 'event-kit'

module.exports =
class VideoViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model
        @width = 600
        @height = 400
        @subscriptions = new CompositeDisposable
        @subscriptions.add @eventHandler.onVideoChange (id) => @model.id = id
        @subscriptions.add @eventHandler.onClear () => @model.id = ""
        @subscriptions.add @eventHandler.onSettingsChange (settings) =>
            #console.log ("settings size to:" + $settings.width +" "+ $settings.height)
            @width = settings.width
            @height = settings.height

    dispose: () ->
        @subscriptions.dispose()
