jest.mock('vue', () => jest.fn(({el,data,methods}) => {
    $data: data
}))
const binder = require('../../../../lib/view-models/search-binder'),
    faker = require('faker'),
    vue = require('vue')

describe('search should', () => {

    test('vue is called with correct parameters', async () => {
        let view = faker.random.uuid(),
            viewModel = {
                someData: faker.random.uuid(),
                onClose: () => faker.random.uuid(),
                onSearch: () => faker.random.uuid(),
                onSelectPrevious: () => faker.random.uuid(),
                onSelectNext: () => faker.random.uuid(),
                onSelectIndex: () => faker.random.uuid(),
            }
        new binder(view, viewModel)
        expect(vue).toBeCalled()
        expect(vue.mock.calls[0][0].el).toBe(view)
        expect(vue.mock.calls[0][0].data).toBe(viewModel)
        expect(vue.mock.calls[0][0].methods.close).not.toBeUndefined()
        expect(vue.mock.calls[0][0].methods.search).not.toBeUndefined()
        expect(vue.mock.calls[0][0].methods.up).not.toBeUndefined()
        expect(vue.mock.calls[0][0].methods.down).not.toBeUndefined()
        expect(vue.mock.calls[0][0].methods.select).not.toBeUndefined()
    })
})