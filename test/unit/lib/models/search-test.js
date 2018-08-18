jest.mock('youtube-node', () => jest.fn())
const Search = require('../../../../lib/models/search'),
    youtube = require('youtube-node'),
    faker = require('faker')

describe('search should', () => {
    let youtubeMock = {
        setKey: jest.fn(),
        addParam: jest.fn(),
        search: jest.fn()
    }
    let key = faker.random.uuid()
    beforeEach(() => {
        youtube.mockImplementation(() => youtubeMock)
    })

    test('have init method that initializes youtube', async () => {
        new Search(key) 
        expect(youtube).toBeCalled() 
        expect(youtubeMock.setKey).toBeCalledWith(key)
    });

    test('have settings method that sets configuration values', async () => {
        let params = {
            numberResults: faker.random.uuid(),
            mode: faker.random.uuid(),
            type: faker.random.uuid()
        }
        let search = new Search() 
        search.settings(params)
        expect(search.numberResults).toEqual(params.numberResults)
        expect(youtubeMock.addParam).toBeCalledWith('safeSearch', params.mode)
        expect(youtubeMock.addParam).toBeCalledWith('type', params.type)
    });

    test('should have find method that return list of videos', async () => {
        let expectedResult = {items: [faker.random.uuid(),faker.random.uuid()]}
        youtubeMock.search.mockImplementation((_, __, cb) => cb(undefined, expectedResult))
        let query = faker.random.uuid()
        let search = new Search() 
        let result = await search.find(query)
        expect(youtubeMock.search).toBeCalledWith(query, search.numberResults, expect.anything()) 
        expect(result).toEqual(expectedResult.items)
    });

    test('should reject on error finding video', async () => {
        youtubeMock.search.mockImplementation((_, __, cb) => cb("error", undefined))
        let query = faker.random.uuid()
        let search = new Search()
        await expect(search.find(query)).rejects.toEqual("error")
    });
})
