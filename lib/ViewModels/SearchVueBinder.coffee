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
                        @$data.onClose()
                    search: () ->
                        @$data.onSearch()
                    up: () ->
                        @$data.onSelectPrevious()
                    down: () ->
                        @$data.onSelectNext()
                    play: () ->
                        @$data.onPlayVideo()
                    select: (index) ->
                        @$data.onSelectIndex(index)
