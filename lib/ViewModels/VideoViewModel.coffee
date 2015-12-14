{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'
SearchModel =require '../Models/SearchModel'


module.exports =
class VideoViewModel
    constructor: (@view, @model) ->
        #search = new SearchModel
        #search.init()
        @vue = allowUnsafeNewFunction =>
          new Vue
            el: @view
            data: @model
            #methods:
            #    hola: (@msg, @e) ->
            #        search.find('troloro',2)
