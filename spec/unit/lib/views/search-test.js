global.document = {
    createElement: jest.fn()
}
jest.mock('path', () => ({
    join: jest.fn()
}))
jest.mock('fs', () => ({
    readFileSync: jest.fn()
}))
const search = require('../../../../lib/views/search'),
    path = require('path'),
    fs = require('fs'),
    faker = require('faker')

describe('search should', () => {
    
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

        let result = new search()

        expect(document.createElement).toBeCalledWith('div')
        expect(elementMock.classList.add).toBeCalledWith('playyoutube')
        expect(path.join).toBeCalledWith(expect.anything(), 'SearchView.html')
        expect(fs.readFileSync).toBeCalledWith(expectPath)
        expect(elementMock.innerHTML).toEqual(expectFileContent)
    });

    test('destroy should remove element', async () => {
        let result = new search()
        result.destroy()
        expect(elementMock.remove).toBeCalled()
    });

    test('get element should return element', async () => {
        let call = new search()
        let result = call.getElement()
        expect(result).toEqual(elementMock)
    });
})