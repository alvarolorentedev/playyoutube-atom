module.exports =
class SearchViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model
        @model.init()
        @initialize()
        that = this
        @subscription = @eventHandler.onClear () -> that.initialize()

    initialize: () ->
        @query = null
        @selected = 0
        @state = "initial"
        @results = [{"snippet" : {"title": "", "description": "", "thumbnails": { "default" : {"url" : ""}}}}]

    onSearch: () ->
        that = this
        @state = "loading"
        search = @model.find(@query, 10)
        search
            .then (res) ->
                that.results = res
                that.state = "ready"
            .catch (err) ->
                that.state = "error"
                console.log(err)

    onSelectPrevious: () ->
        --@selected
        if @selected < 0
            @selected = @results.length - 1

    onSelectNext: () ->
        ++@selected
        if @selected > (@results.length-1)
            @selected = 0

    onSelectIndex: (index) ->
        @selected = index
        @onPlayVideo()

    onPlayVideo: () ->
        @eventHandler.VideoChange(@results[@selected].id.videoId)
        @eventHandler.viewVideoFrame(true)
        @onClose()

    onClose: () ->
        @eventHandler.viewSearchFrame(false)

    dispose: () ->
        @subscription.dispose()
