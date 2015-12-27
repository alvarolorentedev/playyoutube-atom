{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'


module.exports =
class SettingsVueBinder
    constructor: (@view, @model) ->
        @vue = allowUnsafeNewFunction =>
          new Vue
            el: @view
            data: @model
            methods:
                set: () ->
                    @$data.onSet()
