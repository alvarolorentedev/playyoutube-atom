const fs = require('fs'),
    path = require('path')

class search {
    constructor(){
        this.element = document.createElement('div')
        this.element.classList.add('playyoutube')
        this.element.innerHTML = fs.readFileSync(path.join(__dirname, 'SearchView.html'))
    }

    serialize (){}

    destroy() {
        this.element.remove()
    }

    getElement() {
        return this.element
    }
}

module.exports = search