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
    defaultId = 'rar-toe6AUg'

    @viewModel = new VideoViewModel()
    @model = new VideoModel defaultId
    @view = new VideoView

    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:toggle': => @toggle()
    @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:toggleDrag': => @toggleDrag()

  deactivate: ->
    @subscriptions.dispose()


  toggle: ->
    if (@videoPanel)
      @videoPanel.destroy() #this will stop playing. Hiding doesn't stop it.
      @videoPanel = null;

    else
      @buildPlayer()


  buildPlayer: () ->
    @viewModel.refreshView(@view.getElement(), @model)
    @videoPanel = atom.workspace.addRightPanel({item:@viewModel.view})
    @videoPanel.show();

  toggleDrag: ->
    @viewModel.toggleDrag()
