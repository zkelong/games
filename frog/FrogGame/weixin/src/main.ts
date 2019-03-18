import LogoView = lobby.LogoView;
import LobbyMain = lobby.LobbyMainView;
import Stage = Laya.Stage;
import AppInit = utl.AppInit;
import LangConfig = def.LanguageConfig;
import Browser = Laya.Browser;

//初始化微信小游戏
Laya.MiniAdpter.init(true, false);
Laya.init(640, 960, Laya.WebGL);
// 设置适配模式
Laya.stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
Laya.stage.screenMode = Stage.SCREEN_VERTICAL;

if (Browser.onMiniGame) {
    // Laya.timer.once(1000, this, function (): void {
    //     //设置共享画布大小
    //     __JS__('sharedCanvas').width = Laya.stage.width;
    //     __JS__('sharedCanvas').height = Laya.stage.height;
    //     //主域往子域透传消息
    //     __JS__('wx').postMessage({ type: "resizeShared", url: "", data: { width: Laya.stage.width, height: Laya.stage.height, matrix: Laya.stage._canvasTransform }, isLoad: false });
    // });
}


// var rankSprite2 = new Laya.Sprite();
// Laya.stage.addChild(rankSprite2);
// Laya.timer.once(400, this, function (){
//   var rankTexture = new Laya.Texture(Browser.window.sharedCanvas);
//   // rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
//   rankSprite2.graphics.drawTexture(rankTexture, 5, 78, rankTexture.width, rankTexture.height);
// });


//显示FPS
// Laya.Stat.show(0, 50);
AppInit.init();

let lanSource = def.SourceConfig.gameSourceCh;
// if (LangConfig.Lang == LangConfig.Langs.en) {
//     lanSource = def.SourceConfig.gameSourceEn;
// }
let asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSourceCommon).concat(lanSource);
Laya.loader.load(asset, new Laya.Handler(this, () => {
    asset = null;
    let lobby = new LobbyMain;
    Laya.stage.addChild(lobby);
}));