const Vue = require('vue')

class SearchVueBinder{
    constructor(view, viewModel){
        this.vue = new Vue({
            el: view,
            data: viewModel,
            methods: {
                close: viewModel.onClose,
                search: viewModel.onSearch,
                up: viewModel.onSelectPrevious,
                down: viewModel.onSelectNext,
                select: viewModel.onSelectIndex
            }
        })
    }
}

module.exports = SearchVueBinder