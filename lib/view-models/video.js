const Disposable = require('event-kit').CompositeDisposable

const strategies = {
    "youtube#video": (selected) =>  `/${selected.videoId}`,
    "youtube#playlist": (selected) => `?listType=playlist&list=${selected.playlistId}`,
    "youtube#channel": (selected) => `/videoseries?list=UU${selected.channelId.substring(2)}`
}

class Video {
    constructor(model, eventHandler){
        this.model = model
        this.eventHandler = eventHandler
        this.width = 600
        this.height = 400
        this.subscriptions = new Disposable()
        this.subscriptions.add(eventHandler.onClear(() => this.initialize()))
        this.subscriptions.add(eventHandler.onVideoChange((selected) => this.load(selected)))
        this.subscriptions.add(eventHandler.onVideoSettingsChange((settings) => this.settings(settings)))
    }

    initialize(){
        this.model.params = ""
    }

    load(selected){
        this.model.params = strategies[selected.kind](selected)
    }

    settings(settings){
        this.width = settings.width
        this.height = settings.height
    }
    
    dispose(){
        this.subscriptions.dispose()
    }
}

module.exports = Video