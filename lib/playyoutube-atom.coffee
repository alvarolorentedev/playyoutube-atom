PlayyoutubeAtomView = require './playyoutube-atom-view'
{CompositeDisposable} = require 'atom'

module.exports = PlayyoutubeAtom =
  playyoutubeAtomView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @playyoutubeAtomView = new PlayyoutubeAtomView(state.playyoutubeAtomViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @playyoutubeAtomView.getElement(), visible: false)

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
