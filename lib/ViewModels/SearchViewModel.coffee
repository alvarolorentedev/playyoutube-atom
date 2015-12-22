module.exports =
class SearchViewModel
    constructor: (model) ->
        @model = model
        @query = null;
        @results = null;
        model.init()

    onSearch: () ->
        that = this
        search = @model.find(@query, 10)
        search
            .then (res) ->
                that.results = res
                #for result in res
                #    console.log(result.snippet.title)
                #    that.results.push(result)
            .catch (err) ->
                console.log(err)

    addResults: (res) ->
