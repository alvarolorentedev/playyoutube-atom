global.document = {
    createElement: jest.fn()
}
jest.mock('path', () => ({
    join: jest.fn()
}))
jest.mock('fs', () => ({
    readFileSync: jest.fn()
}))
const video = require('../../../../lib/views/video'),
    path = require('path'),
    fs = require('fs'),
    faker = require('faker')

describe('video should', () => {
    
    let elementMock = {
        classList: {add: jest.fn()},
        remove: jest.fn(), 
        innerHTML: ""
    }
    
    beforeEach(() => {
        document.createElement.mockImplementation(() => elementMock)
    })

    test('add a element with correct settings', async () => {
        let expectPath = faker.random.uuid()
        let expectFileContent = faker.random.uuid()
        path.join.mockReturnValue(expectPath)
        fs.readFileSync.mockReturnValue(expectFileContent)

        let result = new video()

        expect(document.createElement).toBeCalledWith('div')
        expect(elementMock.classList.add).toBeCalledWith('video-frame')
        expect(path.join).toBeCalledWith(expect.anything(), 'VideoView.html')
        expect(fs.readFileSync).toBeCalledWith(expectPath)
        expect(elementMock.innerHTML).toEqual(expectFileContent)
    });

    test('destroy should remove element', async () => {
        let result = new video()
        result.destroy()
        expect(elementMock.remove).toBeCalled()
    });

    test('get element should return element', async () => {
        let call = new video()
        let result = call.getElement()
        expect(result).toEqual(elementMock)
    });
})