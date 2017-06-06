var def;
(function (def) {
    var SourceConfig = (function () {
        function SourceConfig() {
        }
        return SourceConfig;
    }());
    //大厅资源
    SourceConfig.lobbySource = [
        { url: "frog/bg.png", type: Laya.Loader.IMAGE },
    ];
    //游戏资源
    SourceConfig.gameSource = [
        { url: "res/atlas/frog.json", type: Laya.Loader.ATLAS },
        { url: "frog/zhuzi.png", type: Laya.Loader.IMAGE },
    ];
    def.SourceConfig = SourceConfig;
})(def || (def = {}));
//# sourceMappingURL=sourceConfig.js.map