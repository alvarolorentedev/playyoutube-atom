const Disposable = require('event-kit').CompositeDisposable

class Search {
    constructor(model, eventHandler){
        this.initialize()
        this.model = model
        this.eventHandler = eventHandler
        this.subscriptions = new Disposable()
        this.subscriptions.add(eventHandler.onClear, this.initialize)
        this.subscriptions.add(eventHandler.onSearchSettingsChange, this.settings)
    }

    initialize(){
        this.query = null
        this.selected = 0
        this.state = "initial"
        this.results = [{"snippet" : {"title": "", "description": "", "thumbnails": { "default" : {"url" : ""}}}}]
    }

    settings(settings) { 
        this.model.settings(settings)
    }

    async onSearch(){
        this.state = "loading"
        try {
            this.results = await this.model.find(this.query)
            this.state = "ready"
        } catch (error) {
            this.state = "error"
            console.error(error)
        }
        
    }

    onSelectPrevious() {
        --this.selected
        if(this.selected < 0)
            this.selected = this.results.length - 1
    }

    onSelectNext(){
        ++this.selected
        if(this.selected > this.results.length - 1)
            this.selected = 0
    }

    onSelectIndex(index){
        this.selected = index
    }

    onPlayVideo(){
        this.eventHandler.VideoChange(this.results[this.selected].id)
        this.eventHandler.viewVideoFrame(true)
        this.onClose()
    }

    onClose(){
        this.eventHandler.viewSearchFrame(false)
    }

    dispose() {
        this.subscriptions.dispose()
    }
}

module.exports = Search