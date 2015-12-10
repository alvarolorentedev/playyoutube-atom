{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'

module.exports =
class VueExperimentViewModel
  constructor: (@view, @model) ->
    Vue.filter 'numToWords', (value) ->
      convert =
        0: 'none'
        1: 'one'
        2: 'two'
        3: 'three'
        4: 'four'
        5: 'five'
      convert[value] ? value

    @vue = allowUnsafeNewFunction =>
      new Vue
        el: @view
        data: @model
