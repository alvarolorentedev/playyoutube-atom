{CompositeDisposable} = require 'atom'
VideoModel =require './Models/VideoModel'
VideoView = require './Views/VideoView'
VideoViewModel = require './ViewModels/VideoViewModel'

module.exports = PlayyoutubeAtom =
  playyoutubeAtomView: null
  modalPanel: null
  editorPanel: null
  subscriptions: null

  activate: (state) ->

    @model = new VideoModel
    @view = new VideoView
    @view.getElement().classList.add('float-bottom-right')
    @viewModel = new VideoViewModel(@view.getElement(), @model)
    @editor = atom.workspace.getActiveTextEditor()
    #@modalPanel = atom.workspace.addModalPanel(item: @viewModel.view, visible: false)
    @editorPanel = atom.workspace.addBottomPanel({item:@viewModel.view}, visible: false)
    #editor = atom.workspace.getActiveTextEditor()
    #markerEditor = editor.markScreenPosition(position, [options])
    #marker = editor.getLastCursor()?.getMarker()
    #@editorPanel = editor.decorateMarker(marker, {type: 'overlay', item: @viewModel.view})


    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:toggle': => @toggle()

  deactivate: ->
    #@modalPanel.destroy()
    @subscriptions.dispose()
    #@playyoutubeAtomView.destroy()

  serialize: ->
    #playyoutubeAtomViewState: @playyoutubeAtomView.serialize()

  toggle: ->
    console.log 'PlayyoutubeAtom was toggled!'
    if @editorPanel.isVisible()
      @editorPanel.hide()
    else
      @editorPanel.show()

    #if @modalPanel.isVisible()
    #  @modalPanel.hide()
    #else
    #  @modalPanel.show()
