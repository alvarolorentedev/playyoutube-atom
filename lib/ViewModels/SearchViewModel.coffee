
module.exports =
class SearchViewModel
    constructor: (model) ->
        @model = model
        model.init()
        @query = 'hello world'
        @results = []

    onSearch: () ->
        console.log(@query)
        #@results = @model.find(@query, 10)
