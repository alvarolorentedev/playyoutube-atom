
module.exports =
class SearchViewModel
    constructor: (model) ->
        @model = model
        @query = "holaaaaaaaaaa";
        model.init()
        @results = []

    onSearch: () ->
        console.log(@query)
        #@results = @model.find(@query, 10)
