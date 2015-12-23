module.exports =
class SearchViewModel
    constructor: (model, eventHandler) ->
        @eventHandler = eventHandler
        @model = model
        @query = null
        @selected = 0
        @results = [{"snippet" : {"title": "", "description": "", "thumbnails": { "default" : {"url" : ""}}}}]
        model.init()

    onSearch: () ->
        that = this
        console.log ('search for ' + @query)
        search = @model.find(@query, 10)
        search
            .then (res) ->
                that.results = res
            .catch (err) ->
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

    onPlayVideo: () ->
        @eventHandler.VideoChange(@results[@selected].id.videoId)
        @eventHandler.viewVideoFrame(true)
        @onClose()

    onClose: () ->
        @eventHandler.viewSearchFrame(false)
