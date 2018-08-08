const Vue = require('vue')
const allowUnsafeNewFunction = require('loophole').allowUnsafeNewFunction

class VideoVueBinder{
    constructor(view, viewModel){
        this.vue = allowUnsafeNewFunction(() => new Vue({
            el: view,
            data: viewModel
        }))
    }
}

module.exports = VideoVueBinder