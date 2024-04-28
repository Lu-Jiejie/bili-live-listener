import { describe, expect, it } from 'vitest'
import { colorHex2Rgb, int2ColorHex } from '../src/utils/color'

describe('test', () => {
  it('int2Hex should work', () => {
    const hexs = ['#2A60B2', '#EDF5FF', '#405D85', '#3171D2', '#7497CD']
    const rgbs = hexs.map(colorHex2Rgb).map(rgbObj => `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`)
    expect(rgbs).toMatchInlineSnapshot(`
      [
        "42, 96, 178",
        "237, 245, 255",
        "64, 93, 133",
        "49, 113, 210",
        "116, 151, 205",
      ]
    `)
  })
  it('colorHex2Int should work', () => {
    expect(int2ColorHex(2951253)).toMatchInlineSnapshot('"#2d0855"')
  })
  it.only('parse data', () => {
    const data = '{"question":"你支持哪支战队","options":[{"idx":1,"desc":"TTG","cnt":722,"percent":0.6747663551401869},{"idx":2,"desc":"BOA","cnt":345,"percent":0.32242990654205606}],"vote_id":11404452,"cnt":1070,"duration":180000,"left_duration":88000,"fade_duration":1000,"waiting_duration":-1,"result":2,"result_text":"蓝领先","component":"https://live.bilibili.com/p/html/live-app-guessing-game/vote.html?is_live_half_webview=1\\u0026hybrid_half_ui=1,3,100p,245,0,0,30,100,12,0;2,2,375,100p,0,0,30,100,12,0;3,3,100p,245,0,0,30,100,12,0;4,2,375,100p,0,0,30,100,12,0;5,3,100p,70p,0,0,30,100,12,0;6,3,100p,70p,0,0,30,100,12,0;7,3,100p,70p,0,0,30,100,12,0;8,3,100p,70p,0,0,30,100,12,0","natural_die_duration":30000,"my_vote":0,"component_anchor":"https://live.bilibili.com/p/html/live-app-guessing-game/anchor_vote.html?pc_ui=390,428,0,3\\u0026is_live_half_webview=1\\u0026hybrid_half_ui=1,3,100p,448,0,0,30,0,12,0;2,2,375,100p,0,0,30,0,12,0;3,3,100p,448,0,0,30,0,12,0;4,2,375,100p,0,0,30,0,12,0;5,3,100p,448,0,0,30,0,12,0;6,2,320,100p,0,0,30,0,12,0;7,2,320,100p,0,0,30,0,12,0;8,2,320,100p,0,0,30,0,12,0#/","audit_reason":"","combo":[{"id":1,"status":4,"content":"TTG","cnt":722,"guide":"","left_duration":88000,"fade_duration":0,"prefix_icon":"http://i0.hdslb.com/bfs/dm/7d7e3682c9116aa3503418abe3cde6b45ed2e91e.png"},{"id":2,"status":4,"content":"BOA","cnt":345,"guide":"","left_duration":88000,"fade_duration":0,"prefix_icon":"http://i0.hdslb.com/bfs/dm/f83c7280b2a90b4f58a68fd8c594ea7d5667e3cb.png"}]}'
    const parsed = JSON.parse(data)
    expect(parsed).toMatchInlineSnapshot(`
      {
        "audit_reason": "",
        "cnt": 1070,
        "combo": [
          {
            "cnt": 722,
            "content": "TTG",
            "fade_duration": 0,
            "guide": "",
            "id": 1,
            "left_duration": 88000,
            "prefix_icon": "http://i0.hdslb.com/bfs/dm/7d7e3682c9116aa3503418abe3cde6b45ed2e91e.png",
            "status": 4,
          },
          {
            "cnt": 345,
            "content": "BOA",
            "fade_duration": 0,
            "guide": "",
            "id": 2,
            "left_duration": 88000,
            "prefix_icon": "http://i0.hdslb.com/bfs/dm/f83c7280b2a90b4f58a68fd8c594ea7d5667e3cb.png",
            "status": 4,
          },
        ],
        "component": "https://live.bilibili.com/p/html/live-app-guessing-game/vote.html?is_live_half_webview=1&hybrid_half_ui=1,3,100p,245,0,0,30,100,12,0;2,2,375,100p,0,0,30,100,12,0;3,3,100p,245,0,0,30,100,12,0;4,2,375,100p,0,0,30,100,12,0;5,3,100p,70p,0,0,30,100,12,0;6,3,100p,70p,0,0,30,100,12,0;7,3,100p,70p,0,0,30,100,12,0;8,3,100p,70p,0,0,30,100,12,0",
        "component_anchor": "https://live.bilibili.com/p/html/live-app-guessing-game/anchor_vote.html?pc_ui=390,428,0,3&is_live_half_webview=1&hybrid_half_ui=1,3,100p,448,0,0,30,0,12,0;2,2,375,100p,0,0,30,0,12,0;3,3,100p,448,0,0,30,0,12,0;4,2,375,100p,0,0,30,0,12,0;5,3,100p,448,0,0,30,0,12,0;6,2,320,100p,0,0,30,0,12,0;7,2,320,100p,0,0,30,0,12,0;8,2,320,100p,0,0,30,0,12,0#/",
        "duration": 180000,
        "fade_duration": 1000,
        "left_duration": 88000,
        "my_vote": 0,
        "natural_die_duration": 30000,
        "options": [
          {
            "cnt": 722,
            "desc": "TTG",
            "idx": 1,
            "percent": 0.6747663551401869,
          },
          {
            "cnt": 345,
            "desc": "BOA",
            "idx": 2,
            "percent": 0.32242990654205606,
          },
        ],
        "question": "你支持哪支战队",
        "result": 2,
        "result_text": "蓝领先",
        "vote_id": 11404452,
        "waiting_duration": -1,
      }
    `)
  })
})
