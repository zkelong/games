namespace def {
    export class SourceConfig {
        //大厅资源
        static lobbySource = [
            { url: "frog/bg.png", type: Laya.Loader.IMAGE },
        ];
        //游戏资源
        static gameSource = [
            { url: "res/atlas/frog.json", type: Laya.Loader.ATLAS },
            { url: "frog/zhuzi.png", type: Laya.Loader.IMAGE },
        ];
    }
}
