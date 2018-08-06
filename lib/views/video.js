const fs = require('fs'),
    path = require('path')

class video {
    constructor(){
        this.element = document.createElement('div')
        this.element.classList.add('video-frame')
        this.element.innerHTML = fs.readFileSync(path.join(__dirname, 'VideoView.html'))
    }

    serialize (){}

    destroy() {
        this.element.remove()
    }

    getElement() {
        return this.element
    }
}

module.exports = video