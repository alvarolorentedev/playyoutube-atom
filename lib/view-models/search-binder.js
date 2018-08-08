const Vue = require('vue/dist/vue.common')

class SearchVueBinder{
    constructor(view, viewModel){
        this.vue = new Vue({
            el: view,
            data: viewModel,
            methods: {
                close: () => this.vue.$data.onClose(),
                search: () => this.vue.$data.onSearch(),
                up: () => this.vue.$data.onSelectPrevious(),
                down: () => this.vue.$data.onSelectNext(),
                play: () => this.vue.$data.onPlayVideo(),
                select: (index) => this.vue.$data.onSelectIndex(index)
            }
        })
    }
}
   
module.exports = SearchVueBinder