var LobbyView = lobby.LobbyMainView;
var GameMainView = game.GameMainView;
var Stage = Laya.Stage;
//初始化微信小游戏
Laya.MiniAdpter.init();
Laya.init(640, 960, Laya.WebGL);
// 设置适配模式
Laya.stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
//显示FPS
// Laya.Stat.show(0, 50);
var asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSource);
Laya.loader.load(asset, new Laya.Handler(this, function () {
    asset = null;
    var lobby = new LobbyView;
    Laya.stage.addChild(lobby);
    // let game = new GameMainView(def.GAMEMODE.MODE1);
    // Laya.stage.addChild(game);
}));
//# sourceMappingURL=main.js.map