{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'

module.exports =
class VideoViewModel
    constructor: (@view, @model) ->
        @vue = allowUnsafeNewFunction =>
          new Vue
            el: @view
            data: @model
            methods:
                close: () ->
                    console.log 'close'
                search: () ->
                    console.log @query
        @vue.$set('query', 'hello')
