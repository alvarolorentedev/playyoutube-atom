jest.mock('vue', () => jest.fn())
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
        expect(vue).toBeCalledWith({
            el: view,
            data: viewModel,
            methods: {
                close: viewModel.onClose,
                search: viewModel.onSearch,
                up: viewModel.onSelectPrevious,
                down: viewModel.onSelectNext,
                select: viewModel.onSelectIndex
            }
        })
    })
})