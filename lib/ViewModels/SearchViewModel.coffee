module.exports =
class SearchViewModel
    constructor: (model) ->
        @model = model
        @query = null;
        @results = [{"snippet" : {"title": "", "description": "", "thumbnails": { "default" : {"url" : ""}}}}];
        model.init()

    onSearch: () ->
        that = this
        search = @model.find(@query, 10)
        search
            .then (res) ->
                that.results = res
                #for result in that.results
                #    console.log(result.snippet.title)
                #    that.results.push(result)
            .catch (err) ->
                console.log(err)

    addResults: (res) ->
