jest.mock('vue', () => jest.fn())
const binder = require('../../../../lib/view-models/video-binder'),
    faker = require('faker'),
    vue = require('vue')

describe('search should', () => {

    test('vue is called with correct parameters', async () => {
        let view = faker.random.uuid(),
            viewModel = {
                someData: faker.random.uuid(),
            }
        new binder(view, viewModel)
        expect(vue).toBeCalledWith({
            el: view,
            data: viewModel
        })
    })
})