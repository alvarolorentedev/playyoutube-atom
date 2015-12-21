{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'

module.exports =
class SearchVueBinder
    constructor: (@view, @model) ->
        @vue = allowUnsafeNewFunction =>
          new Vue
            el: @view
            data: @model
            components:
                'my-text':
                    props: ['text'],
                    template: '<atom-text-editor mini /> {{ text }} </atom-text-editor>'
            methods:
                close: () ->
                    console.log 'close'
                search: () ->
                    @$data.onSearch()
