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
  config:
    videoSettings:
        type: 'object'
        properties:
            width:
                title: 'Width'
                type: 'integer'
                default: 800
            height:
                title: 'Height'
                type: 'integer'
                default: 600
    searchSettings:
        type: 'object'
        properties:
            numberResults:
                title: 'Number of results'
                type: 'integer'
                default: 10
            type:
                title: 'Type of results'
                type: 'string'
                enum: ['video,channel,playlist','video', 'channel', 'playlist']
                default: 'video,channel,playlist'
                order: 5
            mode:
                title: 'Content restriction level'
                type: 'string'
                enum: ['none', 'moderate', 'strict']
                default: 'moderate'
                order: 5

  playyoutubeAtomView: null
  videoPanel: null
  searchPanel: null
  subscriptions: null
  eventHandler: null
  viewModels: []

  InitializeSearchPanel: (handler) ->
      model = new SearchModel
      view = new SearchView
      viewModel = new SearchViewModel(model, handler)
      @viewModels.push(viewModel)
      binder = new SearchVueBinder(view.getElement(), viewModel)
      @searchPanel = atom.workspace.addModalPanel(item:binder.view, visible: false)

  InitializeVideoPanel: (handler) ->
      model = new VideoModel
      view = new VideoView
      viewModel = new VideoViewModel(model, handler)
      @viewModels.push(viewModel)
      binder = new VideoVueBinder(view.getElement(), viewModel)
      @videoPanel = atom.workspace.addBottomPanel(item:binder.view, visible: false)

  activate: (state) ->
      @eventHandler = new EventHandler
      @InitializeSearchPanel(@eventHandler)
      @InitializeVideoPanel(@eventHandler)

      # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
      @subscriptions = new CompositeDisposable

      # Register command that toggles this view
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube:search': => @toggleSearch()
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube:hide': => @VideoFrameVisibility(false)
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube:show': => @VideoFrameVisibility(true)
      @subscriptions.add atom.commands.add 'atom-workspace', 'playyoutube:close': => @ClearAll()
      @subscriptions.add @eventHandler.onViewVideoFrame (visible) => @VideoFrameVisibility(visible)
      @subscriptions.add @eventHandler.onViewSearchFrame (visible) => @SearchFrameVisibility(visible)
      @subscriptions.add atom.config.observe 'playyoutube.videoSettings', (value) => @eventHandler.videoSettingsChange(value)
      @subscriptions.add atom.config.observe 'playyoutube.searchSettings', (value) => @eventHandler.searchSettingsChange(value)

  deactivate: ->
    for viewModel in @viewModels
        viewModel.dispose()
    @videoPanel.destroy()
    @searchPanel.destroy()
    @subscriptions.dispose()
    @eventHandler.destroy()
    @playyoutubeAtomView.destroy()


  serialize: ->
    playyoutubeAtomViewState: @playyoutubeAtomView.serialize()

  ClearAll: () ->
    @VideoFrameVisibility(false)
    @SearchFrameVisibility(false)
    @eventHandler.clear()

  toggleSearch: ->
    if @searchPanel.isVisible()
      @SearchFrameVisibility(false)
    else
      @SearchFrameVisibility(true)

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
