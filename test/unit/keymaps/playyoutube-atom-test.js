let mappings = require('../../../keymaps/playyoutube-atom.json')
describe('keymaps should have correct map', () => {

    test('ctrl-shift-y should map to playyoutube:search', async () => {
        expect(mappings['atom-workspace']['ctrl-shift-y']).toEqual('playyoutube:search')
    })

    test('ctrl-shift-h should map to playyoutube:hide', async () => {
        expect(mappings['atom-workspace']['ctrl-shift-h']).toEqual('playyoutube:hide')
    })

    test('ctrl-shift-j should map to playyoutube:hide', async () => {
        expect(mappings['atom-workspace']['ctrl-shift-j']).toEqual('playyoutube:show')
    })

    test('ctrl-shift-j should map to playyoutube:hide', async () => {
        expect(mappings['atom-workspace']['ctrl-shift-c']).toEqual('playyoutube:close')
    })

})