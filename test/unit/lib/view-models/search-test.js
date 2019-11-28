jest.mock('event-kit', () => ({
    CompositeDisposable: jest.fn()
}))
global.console = { error: jest.fn() }

const Search = require('../../../../lib/view-models/search'),
    disposable = require('event-kit').CompositeDisposable,
    faker = require('faker')

describe('search should', () => {
    let disposableMock = {
        dispose: jest.fn(),
        add: jest.fn()
    }
    let model = {
        settings: jest.fn(),
        find: jest.fn()
    }
    let eventHandler = {
        onClear: jest.fn(),
        onSearchSettingsChange: jest.fn(),
        viewSearchFrame: jest.fn(),
        VideoChange: jest.fn(),
        viewVideoFrame: jest.fn(),
    }
    beforeEach(() => {
        disposableMock.add.mockClear()
        disposable.mockImplementation(() => disposableMock)
    })

    test('initial state', async () => {
        let eventExpected = faker.random.uuid()
        let eventExpected2 = faker.random.uuid()
        eventHandler.onClear.mockReturnValue(eventExpected)
        eventHandler.onSearchSettingsChange.mockReturnValue(eventExpected2)

        let search = new Search(model, eventHandler)

        expect(search.model).toEqual(model)
        expect(search.eventHandler).toEqual(eventHandler)
        expect(search.query).toEqual(null)
        expect(search.selected).toEqual(0)
        expect(search.state).toEqual("initial")
        expect(search.results).toEqual([{"snippet" : {"title": "", "description": "", "thumbnails": { "default" : {"url" : ""}}}}])
        expect(disposable).toBeCalled()
        expect(eventHandler.onClear).toBeCalled()
        expect(eventHandler.onSearchSettingsChange).toBeCalled()
        expect(disposableMock.add).toBeCalledWith(eventExpected)
        expect(disposableMock.add).toBeCalledWith(eventExpected2)
    })

    test('call initialize should reset initial state', async () => {
        let search = new Search(model,eventHandler)
        search.query = ""
        search.selected = ""
        search.state = ""
        search.results = ""

        search.initialize()
        
        expect(search.query).toEqual(null)
        expect(search.selected).toEqual(0)
        expect(search.state).toEqual("initial")
        expect(search.results).toEqual([{"snippet" : {"title": "", "description": "", "thumbnails": { "default" : {"url" : ""}}}}])
    })

    test('call settings calls model settings function', async () => {
        let param = faker.random.uuid()
        let search = new Search(model,eventHandler)
        search.settings(param)
        expect(model.settings).toBeCalledWith(param)
    })

    test('onSearch should find video and change state', async () => {
        let search = new Search(model,eventHandler)
        let expectedResult = faker.random.uuid()
        search.query = faker.random.uuid()
        model.find.mockImplementation(() => Promise.resolve(expectedResult))
        let resultPromise = search.onSearch()
        expect(search.state).toEqual("loading")
        expect(model.find).toBeCalledWith(search.query)

        await resultPromise
        
        expect(search.state).toEqual("ready")
        expect(search.results).toEqual(expectedResult)
        
    })

    test('onSearch should find video and change state', async () => {
        let search = new Search(model,eventHandler)
        let expectedError = faker.random.uuid()
        model.find.mockImplementation(() => Promise.reject(expectedError))

        await search.onSearch()

        expect(search.state).toEqual("error")
        expect(console.error).toBeCalledWith(expectedError)
    })

    test('onSelectPrevious should decrease by one if bigger than 0', async () => {
        let search = new Search(model,eventHandler)
        let number = faker.random.number({ min: 1, max: 100})
        search.selected = number

        search.onSelectPrevious()

        expect(search.selected).toEqual(number - 1)
    })

    test('onSelectNext should increase by one if smaller than result size', async () => {
        let search = new Search(model,eventHandler)
        
        let number = faker.random.number({ min: 1, max: 100})
        search.selected = number
        search.results = new Array(number+2)
        search.onSelectNext()

        expect(search.selected).toEqual(number + 1)
    })

    test('onSelectNext should start from 0 if bigger than result size', async () => {
        let search = new Search(model,eventHandler)
        
        let number = faker.random.number({ min: 1, max: 100})
        search.selected = number
        search.results = new Array(number+1)
        search.onSelectNext()

        expect(search.selected).toEqual(0)
    })

    test('onSelectPrevious should be last item if smaller than 0', async () => {
        let search = new Search(model,eventHandler)
        let number = faker.random.number({ min: 1, max: 100})
        search.selected = 0
        search.results = new Array(number)

        search.onSelectPrevious()

        expect(search.selected).toEqual(number-1)
    })

    test('onSelectIndex should set selected to the index', async () => {
        let search = new Search(model,eventHandler)

        search.onSelectIndex(0)

        expect(search.selected).toEqual(0)
        expect(eventHandler.VideoChange).toBeCalledWith(search.results[search.selected].id)
        expect(eventHandler.viewVideoFrame).toBeCalledWith(true)
        expect(eventHandler.viewSearchFrame).toBeCalledWith(false)
    })

    test('onPlayVideo should call eventHandler VideoChange and viewVideoFrame', () => {
        let search = new Search(model,eventHandler)
        search.onPlayVideo()
        expect(eventHandler.VideoChange).toBeCalledWith(search.results[search.selected].id)
        expect(eventHandler.viewVideoFrame).toBeCalledWith(true)
        expect(eventHandler.viewSearchFrame).toBeCalledWith(false)
    })

    test('onClose should call eventHandler viewSearchFrame with false', () => {
        let search = new Search(model,eventHandler)
        search.onClose()
        expect(eventHandler.viewSearchFrame).toBeCalledWith(false)
    })

    test('dispose should call subscription dispose', () => {
        let search = new Search(model,eventHandler)
        search.dispose()
        expect(disposableMock.dispose).toBeCalled()
    })
})
