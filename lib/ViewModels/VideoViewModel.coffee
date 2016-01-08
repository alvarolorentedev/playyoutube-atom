{CompositeDisposable} = require 'event-kit'

module.exports =
class VideoViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model
        @width = 600
        @height = 400
        @subscriptions = new CompositeDisposable
        @subscriptions.add @eventHandler.onVideoChange (selected) =>
          @load(selected)
        @subscriptions.add @eventHandler.onClear () => @model.params = ""
        @subscriptions.add @eventHandler.onVideoSettingsChange (settings) =>
            @width = settings.width
            @height = settings.height

    load: (selected) ->
      #TODO: improve, i hate to use ifs and the strategy pattern is an overkill
      if(selected.kind == "youtube#video")
        @model.params = "/" + selected.videoId
      else if(selected.kind == "youtube#playlist")
        @model.params = "?listType=playlist&list=" + selected.playlistId
      else if(selected.kind == "youtube#channel")
        @model.params = "/videoseries?list=UU" + selected.channelId.substring(2)

    dispose: () ->
        @subscriptions.dispose()
