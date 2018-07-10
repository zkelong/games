namespace def {
    export class LanguageConfig {
        static Lang = ""; //ch-中文, "en"-英文

        static Langs = {
            ch: "ch",
            en: "en"
        }

        static ch = {
            "RANK": "在做成功蛤的道路上超过了全世界",
            "RANK1": "的蛤",
            "LOADING": "加载中...",
            "SCORE1": "分数: ",
            "SCORE2": "得分",
            "OPERATE": "滑动操作",
            "JUMPSMALL": "向右小跳",
            "JUMPUP": "向上大跳",
            "EASY": "非常简单",
            "CLICK_BEGIN": "点击屏幕开始游戏",
            "JUMP": "跳一哈",
            "HISTORY": "历史最高",
            "LANGUAGE": "English"
        }
        static en = {
            "RANK": "Toads surpass ",
            "RANK1": " on the road to success.",
            "LOADING": "Loading...",
            "SCORE1": "score: ",
            "SCORE2": "SCORE",
            "OPERATE": "Sliding operate",
            "JUMPSMALL": "Left small jump",
            "JUMPUP": "Right big jump",
            "EASY": "Very easy",
            "CLICK_BEGIN": "Tap to begin game",
            "JUMP": "Jump",
            "HISTORY": "Highest",
            "LANGUAGE": "中文"
        }
        static Keys = {
            RANK: "RANK",
            RANK1: "RANK1",
            LOADING: "LOADING",
            SCORE1: "SCORE1",
            SCORE2: "SCORE2",
            OPERATE: "OPERATE",
            JUMPSMALL: "JUMPSMALL",
            JUMPUP: "JUMPUP",
            EASY: "EASY",
            CLICK_BEGIN: "CLICK_BEGIN",
            JUMP: "JUMP",
            HISTORY: "HISTORY",
            LANGUAGE: "LANGUAGE",
        }
    }
    export function getLanguageStr(key) {
        let ret = key;
        if(def.LanguageConfig.Lang == def.LanguageConfig.Langs.en) {
            ret = LanguageConfig.en[key];
        } else {
            ret = LanguageConfig.ch[key];
        }
        return ret;
    }
}