let mappings = require('../../../menus/playyoutube-atom.json')
describe('menus should have correct map', () => {

    test('context-menu should have expectedMap', async () => {
        let expectedMap = [
            {"command": "playyoutube:search", "label": "Open playyoutube search"}, 
            {"command": "playyoutube:hide", "label": "Hide playyoutube player"}, 
            {"command": "playyoutube:show", "label": "Show playyoutube player"}, 
            {"command": "playyoutube:close", "label": "Close playyoutube player"}
        ]
        expect(mappings["context-menu"]["atom-text-editor"]).toEqual(expectedMap)
    })

    test('context-menu should have expectedMap', async () => {
        let expectedMap = [
            {
              "label": "playyoutube",
              "submenu": [
                {
                  "label": "Open search",
                  "command": "playyoutube:search"
                },
                {
                  "label": "Show player",
                  "command": "playyoutube:show"
                },
                {
                  "label": "Hide player",
                  "command": "playyoutube:hide"
                },
                {
                  "label": "Close player",
                  "command": "playyoutube:close"
                }
              ]
            }
          ]
        expect(mappings.menu[0].submenu).toEqual(expectedMap)
    })

})