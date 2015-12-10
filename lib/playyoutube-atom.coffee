{CompositeDisposable} = require 'atom'
TestModel = require './Models/TestModel'
TestView = require './Views/TestView'
TestViewModel = require './ViewModels/TestViewModel'

module.exports = PlayyoutubeAtom =
  playyoutubeAtomView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->

    @model = new TestModel
    @view = new TestView
    @viewModel = new TestViewModel(@view.getElement(), @model)
    @modalPanel = atom.workspace.addModalPanel(item: @viewModel.view, visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @playyoutubeAtomView.destroy()

  serialize: ->
    playyoutubeAtomViewState: @playyoutubeAtomView.serialize()

  toggle: ->
    console.log 'PlayyoutubeAtom was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
