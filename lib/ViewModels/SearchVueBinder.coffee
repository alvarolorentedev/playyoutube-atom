{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'

module.exports =
class SearchVueBinder
    constructor: (@view, @model) ->
        @vue = allowUnsafeNewFunction =>
          new Vue
            el: @view
            data: @model
            methods:
                close: () ->
                    console.log 'close'
                search: () ->
                    @$data.onSearch()
