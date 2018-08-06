const Vue = require('vue')

class VideoVueBinder{
    constructor(view, viewModel){
        this.vue = new Vue({
            el: view,
            data: viewModel
        })
    }
}

module.exports = VideoVueBinder