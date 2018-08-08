const Video = require('../../../../lib/models/video')

describe('video should', () => {

    test('have params exported', async () => {
        let instance = new Video()
        expect(instance.params).toEqual({})
    })
})