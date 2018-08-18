'use babel'

import { CompositeDisposable } from 'atom'

import EventHandler from './helpers/event-handler'

import VideoModel from './Models/video'
import VideoView from './Views/video'
import VideoViewModel from './view-models/video'
import VideoVueBinder from './view-models/video-binder'

import SearchModel from './Models/search'
import SearchView from './Views/search'
import SearchViewModel from './view-models/search'
import SearchVueBinder from './view-models/search-binder'

export default {
  config: {
    videoSettings: {
      type: 'object',
      properties:{
        width:{
          title: 'Width',
          type: 'integer',
          default: 800
        },
        height:{
          title: 'Height',
          type: 'integer',
          default: 600
        },
      }
    },
    searchSettings: {
      type: 'object',
      properties:{
        numberResults:{
          title: 'Number of results',
          type: 'integer',
          default: 10
        },
        type:{
          title: 'Type of results',
          type: 'string',
          enum: ['video,channel,playlist','video', 'channel', 'playlist'],
          default: 'video,channel,playlist',
          order: 5
        },
        mode:{
          title: 'Content restriction level',
          type: 'string',
          enum: ['none', 'moderate', 'strict'],
          default: 'moderate',
          order: 5
        }
      }
    },
  },
  playyoutubeAtomView: null,
  videoPanel: null,
  searchPanel: null,
  subscriptions: null,
  eventHandler: null,
  viewModels: [],
  InitializeSearchPanel(handler){
    let key = Buffer.from("QUl6YVN5QVpqOGFMZXRfdmxwZ242dFlXXzhtM1Q2cW1FQWlJTEpR", 'base64').toString('ascii')
    let model = new SearchModel(key),
      view = new SearchView(),
      viewModel = new SearchViewModel(model, handler)
    this.viewModels.push(viewModel)
    let binder = new SearchVueBinder(view.getElement(), viewModel)
    return atom.workspace.addModalPanel({item:binder.vue.$el, visible: false})
  },
  InitializeVideoPanel(handler){
    let model = new VideoModel(),
      view = new VideoView(),
      viewModel = new VideoViewModel(model, handler)
    this.viewModels.push(viewModel)
    let binder = new VideoVueBinder(view.getElement(), viewModel)
    return atom.workspace.addBottomPanel({item:binder.vue.$el, visible: true})
  },
  activate(_) {
    this.eventHandler = new EventHandler()
    this.searchPanel = this.InitializeSearchPanel(this.eventHandler)
    this.videoPanel = this.InitializeVideoPanel(this.eventHandler)
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'playyoutube:search': () => this.toggleSearch(),
      'playyoutube:hide': () => this.VideoFrameVisibility(false),
      'playyoutube:show': () => this.VideoFrameVisibility(true),
      'playyoutube:close': () => this.ClearAll()
    }))
    
    this.subscriptions.add(this.eventHandler.onViewVideoFrame((visible) => this.VideoFrameVisibility(visible)))
    this.subscriptions.add(this.eventHandler.onViewSearchFrame((visible) => this.SearchFrameVisibility(visible)))
    
    this.subscriptions.add(atom.config.observe('playyoutube.videoSettings', (value) => this.eventHandler.videoSettingsChange(value)))
    this.subscriptions.add(atom.config.observe('playyoutube.searchSettings', (value) => this.eventHandler.searchSettingsChange(value)))
  },
  deactivate() {
    this.viewModels.forEach(viewModel => viewModel.dispose())
    this.videoPanel.destroy()
    this.searchPanel.destroy()
    this.subscriptions.dispose()
    this.eventHandler.destroy()
  },
  serialize() {
    return { }
  },
  toggleSearch(){
    if(this.searchPanel.isVisible())
      this.SearchFrameVisibility(false)
    else
      this.SearchFrameVisibility(true)
      document.getElementById('yt-searchbar').focus()
  },
  ClearAll(){
    this.VideoFrameVisibility(false)
    this.SearchFrameVisibility(false)
    this.eventHandler.clear()
  },
  VideoFrameVisibility(visible){
    if(visible)
      this.videoPanel.show()
    else
      this.videoPanel.hide()
  },
  SearchFrameVisibility(visible){
    if(visible)
      this.searchPanel.show()
    else
      this.searchPanel.hide()
  }

};






