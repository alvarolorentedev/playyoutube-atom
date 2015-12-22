{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'


module.exports =
class VideoVueBinder
    constructor: (@view, @model) ->
        @vue = allowUnsafeNewFunction =>
          new Vue
            el: @view
            data: @model
