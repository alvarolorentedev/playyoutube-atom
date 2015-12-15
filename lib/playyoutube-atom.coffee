{CompositeDisposable} = require 'atom'

VideoModel =require './Models/VideoModel'
VideoView = require './Views/VideoView'
VideoViewModel = require './ViewModels/VideoViewModel'

SearchModel =require './Models/SearchModel'
SearchView = require './Views/SearchView'
SearchViewModel = require './ViewModels/SearchViewModel'

module.exports = PlayyoutubeAtom =
  playyoutubeAtomView: null
  videoPanel: null
  searchPanel: null
  subscriptions: null

  InitializeSearchPanel: ->
      model = new SearchModel
      view = new SearchView
      viewModel = new SearchViewModel(view.getElement(), model)
      @searchPanel = atom.workspace.addModalPanel(item:viewModel.view, visible: false)

  InitializeVideoPanel: ->
      model = new VideoModel
      view = new VideoView
      view.getElement().classList.add('float-bottom-right')
      viewModel = new VideoViewModel(view.getElement(), model)
      @videoPanel = atom.workspace.addBottomPanel(item:viewModel.view, visible: false)

  activate: (state) ->
    this.InitializeSearchPanel()
    this.InitializeVideoPanel()

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:toggle': => @toggle()

  deactivate: ->
    @videoPanel.destroy()
    @subscriptions.dispose()
    @playyoutubeAtomView.destroy()

  serialize: ->
    playyoutubeAtomViewState: @playyoutubeAtomView.serialize()

  toggle: ->
    if @videoPanel.isVisible()
      @videoPanel.hide()
    else
      @videoPanel.show()
    if @searchPanel.isVisible()
      @searchPanel.hide()
    else
      @searchPanel.show()
