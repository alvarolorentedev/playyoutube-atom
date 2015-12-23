module.exports =
class VideoViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model
        @width = 600
        @height = 400
        that = this
        @subscription = @eventHandler.onVideoChange (id) -> that.model.id = id
        # Later, to unsubscribe...
        #subscription.dispose()
