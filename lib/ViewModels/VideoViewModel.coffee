{allowUnsafeNewFunction} = require 'loophole'
Vue = require 'vue'

module.exports =
class VideoViewModel
    constructor: (@view, @model) ->

    refreshView: (@view, @model) ->
      @vue = allowUnsafeNewFunction =>
        new Vue
          el: @view
          data: @model
          

    toggleDrag: ->
      @view.getElementsByClassName('player-actions')[0].classList.toggle 'show'


    initDragEvent: ->
      selected = null
      x_pos = 0
      y_pos = 0
      x_elem = 0
      y_elem = 0
      # Bind the functions...
      # Stores top, left values (edge) of the element
      # Will be called when user starts dragging an element

      _drag_init = (elem) ->
        # Store the object of the element which needs to be moved
        selected = elem
        x_elem = x_pos - (selected.offsetLeft)
        y_elem = y_pos - (selected.offsetTop)
        return

      # Will be called when user dragging an element

      _move_elem = (e) ->
        x_pos = if document.all then window.event.clientX else e.pageX
        y_pos = if document.all then window.event.clientY else e.pageY
        if selected != null
          selected.style.left = x_pos - x_elem + 'px'
          selected.style.top = y_pos - y_elem + 'px'
        return

      # Destroy the object when we are done

      _destroy = ->
        selected = null
        return

      @view.onmousedown = ->
        _drag_init this
        false

      @view.getElementsByClassName('player-actions')[0].onmousemove = _move_elem
      @view.getElementsByClassName('player-actions')[0].onmouseup = _destroy


#@view.addEventListener("click", () -> alert "Hello World!" )