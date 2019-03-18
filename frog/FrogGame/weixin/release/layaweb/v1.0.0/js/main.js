var LogoView = lobby.LogoView;
var LobbyMain = lobby.LobbyMainView;
var Stage = Laya.Stage;
var AppInit = utl.AppInit;
var LangConfig = def.LanguageConfig;
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
AppInit.init();
var lanSource = def.SourceConfig.gameSourceCh;
// if (LangConfig.Lang == LangConfig.Langs.en) {
//     lanSource = def.SourceConfig.gameSourceEn;
// }
var asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSourceCommon).concat(lanSource);
Laya.loader.load(asset, new Laya.Handler(this, function () {
    asset = null;
    var lobby = new LobbyMain;
    Laya.stage.addChild(lobby);
}));
//# sourceMappingURL=main.js.map