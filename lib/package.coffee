PackageView = require './package-view'
{CompositeDisposable} = require 'atom'

module.exports = Package =
  packageView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @packageView = new PackageView(state.packageViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @packageView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'package:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @packageView.destroy()

  serialize: ->
    packageViewState: @packageView.serialize()

  toggle: ->
    console.log 'Package was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
