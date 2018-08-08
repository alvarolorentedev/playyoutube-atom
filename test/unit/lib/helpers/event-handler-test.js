jest.mock('event-kit', () => ({
    Emitter: jest.fn()
}))

const EventHandler = require('../../../../lib/helpers/event-handler'),
        emmiter = require('event-kit').Emitter,
        faker = require('Faker')

describe('event-handler should', () => {
    emmiterMock = {
        on: jest.fn(),
        emit: jest.fn(),
        dispose: jest.fn()
    }

    beforeEach(() => {
        emmiterMock.on.mockClear()
        emmiterMock.emit.mockClear()
        emmiter.mockImplementation(() => emmiterMock)
    })

    test('emiter instance should the result of call to library', async () => {
        let eventHandler = new EventHandler()
        expect(eventHandler.emmiter).toBe(emmiter.emmiterMock)
    })

    test('onVideoChange should call on method with play-video and callback', async () => {
        let eventHandler = new EventHandler()
        let callback = faker.random.uuid()
        eventHandler.onVideoChange(callback)
        expect(emmiterMock.on).toBeCalledWith('play-video', callback)
    })

    test('onClear should call on method with clear-control and callback', async () => {
        let eventHandler = new EventHandler()
        let callback = faker.random.uuid()
        eventHandler.onClear(callback)
        expect(emmiterMock.on).toBeCalledWith('clear-control', callback)
    })

    test('onViewVideoFrame should call on method with video-frame-visibility and callback', async () => {
        let eventHandler = new EventHandler()
        let callback = faker.random.uuid()
        eventHandler.onViewVideoFrame(callback)
        expect(emmiterMock.on).toBeCalledWith('video-frame-visibility', callback)
    })

    test('onViewSearchFrame should call on method with search-frame-visibility and callback', async () => {
        let eventHandler = new EventHandler()
        let callback = faker.random.uuid()
        eventHandler.onViewSearchFrame(callback)
        expect(emmiterMock.on).toBeCalledWith('search-frame-visibility', callback)
    })

    test('onVideoSettingsChange should call on method with video-settings-change and callback', async () => {
        let eventHandler = new EventHandler()
        let callback = faker.random.uuid()
        eventHandler.onVideoSettingsChange(callback)
        expect(emmiterMock.on).toBeCalledWith('video-settings-change', callback)
    })

    test('onSearchSettingsChange should call on method with search-settings-change and callback', async () => {
        let eventHandler = new EventHandler()
        let callback = faker.random.uuid()
        eventHandler.onSearchSettingsChange(callback)
        expect(emmiterMock.on).toBeCalledWith('search-settings-change', callback)
    })

    test('clear should call emit method', async () => {
        let eventHandler = new EventHandler()
        eventHandler.clear()
        expect(emmiterMock.emit).toBeCalledWith('clear-control')
    })

    test('VideoChange should call emit play-video with id', async () => {
        let eventHandler = new EventHandler()
        let param = faker.random.uuid()
        eventHandler.VideoChange(param)
        expect(emmiterMock.emit).toBeCalledWith('play-video', param)
    })

    test('viewVideoFrame should call emit video-frame-visibility with visible', async () => {
        let eventHandler = new EventHandler()
        let param = faker.random.uuid()
        eventHandler.viewVideoFrame(param)
        expect(emmiterMock.emit).toBeCalledWith('video-frame-visibility', param)
    })

    test('viewVideoFrame should call emit search-frame-visibility with visible', async () => {
        let eventHandler = new EventHandler()
        let param = faker.random.uuid()
        eventHandler.viewSearchFrame(param)
        expect(emmiterMock.emit).toBeCalledWith('search-frame-visibility', param)
    })

    test('videoSettingsChange should call emit video-settings-change with settings', async () => {
        let eventHandler = new EventHandler()
        let param = faker.random.uuid()
        eventHandler.videoSettingsChange(param)
        expect(emmiterMock.emit).toBeCalledWith('video-settings-change', param)
    })

    test('searchSettingsChange should call emit search-settings-change with settings', async () => {
        let eventHandler = new EventHandler()
        let param = faker.random.uuid()
        eventHandler.searchSettingsChange(param)
        expect(emmiterMock.emit).toBeCalledWith('search-settings-change', param)
    })
    test('destroy should call dispose', async () => {
        let eventHandler = new EventHandler()
        eventHandler.destroy()
        expect(emmiterMock.dispose).toBeCalled()
    })
})