const Emitter = require('event-kit').Emitter

class EventHandler{
    constructor(){
        this.emitter = new Emitter()
    }

    onVideoChange(callback){
        return this.emitter.on('play-video', callback)
    }

    onClear(callback){
        return this.emitter.on('clear-control', callback)
    }

    onViewVideoFrame(callback){
        return this.emitter.on('video-frame-visibility', callback)
    }

    onViewSearchFrame(callback){
        return this.emitter.on('search-frame-visibility', callback)
    }

    onVideoSettingsChange(callback){
        return this.emitter.on('video-settings-change', callback)
    }

    onSearchSettingsChange(callback){
        return this.emitter.on('search-settings-change', callback)
    }

    clear(){
        return this.emitter.emit('clear-control')
    }

    VideoChange(id){
        return this.emitter.emit('play-video', id)
    }

    viewVideoFrame(visible){
        return this.emitter.emit('video-frame-visibility', visible)
    }

    viewSearchFrame(visible){
        return this.emitter.emit('search-frame-visibility', visible)
    }

    videoSettingsChange(settings){
        return this.emitter.emit('video-settings-change', settings)
    }

    searchSettingsChange(settings){
        return this.emitter.emit('search-settings-change', settings)
    }

    destroy(){
        this.emitter.dispose()
    }
}
module.exports = EventHandler
