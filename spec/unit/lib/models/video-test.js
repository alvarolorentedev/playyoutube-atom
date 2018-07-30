const video = require('../../../../lib/models/video')

describe('video should', () => {

    test('have params exported', async () => {
        expect(video._.params).toEqual({})
    })
})