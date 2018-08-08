jest.mock('event-kit', () => ({
    CompositeDisposable: jest.fn()
}))
global.console = { error: jest.fn() }

const Video = require('../../../../lib/view-models/video'),
    disposable = require('event-kit').CompositeDisposable,
    faker = require('faker')

describe('search should', () => {
    let disposableMock = {
        dispose: jest.fn(),
        add: jest.fn()
    }
    let model = {
    }
    let eventHandler = {
        onVideoChange: jest.fn(),
        onClear: jest.fn(),
        onVideoSettingsChange: jest.fn(),
    }
    beforeEach(() => {
        disposableMock.add.mockClear()
        disposable.mockImplementation(() => disposableMock)
    })

    test('initial state', async () => {
        let eventExpected = faker.random.uuid()
        let eventExpected2 = faker.random.uuid()
        let eventExpected3 = faker.random.uuid()
        eventHandler.onClear.mockReturnValue(eventExpected)
        eventHandler.onVideoChange.mockReturnValue(eventExpected2)
        eventHandler.onVideoSettingsChange.mockReturnValue(eventExpected3)

        let video = new Video(model, eventHandler)

        expect(video.model).toEqual(model)
        expect(video.eventHandler).toEqual(eventHandler)
        expect(video.width).toEqual(600)
        expect(video.height).toEqual(400)
        expect(disposable).toBeCalled()
        expect(eventHandler.onClear).toBeCalled()
        expect(eventHandler.onVideoChange).toBeCalled()
        expect(eventHandler.onVideoSettingsChange).toBeCalled()
        expect(disposableMock.add).toBeCalledWith(eventExpected)
        expect(disposableMock.add).toBeCalledWith(eventExpected2)
        expect(disposableMock.add).toBeCalledWith(eventExpected3)
    })

    test('reset params', async () => {
        let video = new Video(model, eventHandler)
        video.model.params = faker.random.uuid()
        video.initialize()
        expect(video.model.params).toEqual("")
    })

    test('set settings', async () => {
        let settings = {
            width: faker.random.number(1000),
            height: faker.random.number(1000),
        }
        let video = new Video(model, eventHandler)
        video.settings(settings)
        expect(video.width).toEqual(settings.width)
        expect(video.height).toEqual(settings.height)
    })

    test('load video', async () => {
        let selected = {
            kind: "youtube#video",
            videoId: faker.random.uuid()
        }
        let video = new Video(model, eventHandler)
        video.load(selected)
        expect(video.model.params).toEqual(`/${selected.videoId}`)
    })

    test('load playlist', async () => {
        let selected = {
            kind: "youtube#playlist",
            playlistId: faker.random.uuid()
        }
        let video = new Video(model, eventHandler)
        video.load(selected)
        expect(video.model.params).toEqual(`?listType=playlist&list=${selected.playlistId}`)
    })

    test('load channel', async () => {
        let selected = {
            kind: "youtube#channel",
            channelId: faker.random.uuid()
        }
        let video = new Video(model, eventHandler)
        video.load(selected)
        expect(video.model.params).toEqual(`/videoseries?list=UU${selected.channelId.substring(2)}`)
    })


    test('dispose should call subscription dispose', () => {
        let video = new Video(model, eventHandler)
        video.dispose()
        expect(disposableMock.dispose).toBeCalled()
    })
})