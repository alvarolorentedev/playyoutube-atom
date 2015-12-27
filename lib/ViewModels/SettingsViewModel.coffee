{CompositeDisposable} = require 'event-kit'

module.exports =
class SettingsViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model

    onSet: () ->
        @eventHandler.SettingsChange(@model)

    dispose: () ->
        @subscriptions.dispose()
