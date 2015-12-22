fs = require 'fs'
path = require 'path'

module.exports =
class VideoView
  constructor: ->
    @element = document.createElement('div')
    @element.classList.add('video-frame')
    @element.innerHTML = fs.readFileSync(path.join(__dirname, 'VideoView.html'))

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @element.remove()

  getElement: ->
    @element
