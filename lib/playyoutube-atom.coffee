{CompositeDisposable} = require 'atom'

EventHandler =require './Helpers/PlayyoutubeEventHandler'

VideoModel =require './Models/VideoModel'
VideoView = require './Views/VideoView'
VideoViewModel = require './ViewModels/VideoViewModel'
VideoVueBinder = require './ViewModels/VideoVueBinder'

SearchModel =require './Models/SearchModel'
SearchView = require './Views/SearchView'
SearchViewModel = require './ViewModels/SearchViewModel'
SearchVueBinder = require './ViewModels/SearchVueBinder'

module.exports = PlayyoutubeAtom =
  playyoutubeAtomView: null
  videoPanel: null
  searchPanel: null
  subscriptions: null
  eventHandler: null

  InitializeSearchPanel: (handler) ->
      model = new SearchModel
      view = new SearchView
      viewModel = new SearchViewModel(model, handler)
      binder = new SearchVueBinder(view.getElement(), viewModel)
      @searchPanel = atom.workspace.addModalPanel(item:binder.view, visible: false)

  InitializeVideoPanel: (handler) ->
      model = new VideoModel
      view = new VideoView
      viewModel = new VideoViewModel(model, handler)
      binder = new VideoVueBinder(view.getElement(), viewModel)
      @videoPanel = atom.workspace.addBottomPanel(item:binder.view, visible: false)

  activate: (state) ->
      @eventHandler = new EventHandler
      this.InitializeSearchPanel(@eventHandler)
      this.InitializeVideoPanel(@eventHandler)

      # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
      @subscriptions = new CompositeDisposable

      # Register command that toggles this view
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:search': => @toggle()
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:hide': => @VideoFrameVisibility(false)
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube-atom:close': => @VideoFrameVisibility(false)
      @subscriptions.add @eventHandler.onViewVideoFrame (visible) => @VideoFrameVisibility(visible)
      @subscriptions.add @eventHandler.onViewSearchFrame (visible) => @SearchFrameVisibility(visible)

  deactivate: ->
    @videoPanel.destroy()
    @subscriptions.dispose()
    @playyoutubeAtomView.destroy()

  serialize: ->
    playyoutubeAtomViewState: @playyoutubeAtomView.serialize()


  VideoFrameVisibility: (visible) ->
    if(visible)
        @videoPanel.show()
    else
        @videoPanel.hide()

  SearchFrameVisibility: (visible) ->
    if(visible)
        @searchPanel.show()
    else
        @searchPanel.hide()

  toggle: ->
    if @searchPanel.isVisible()
     @SearchFrameVisibility(false)
    else
      @SearchFrameVisibility(true)
