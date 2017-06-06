

import Lobby = lobby.LobbyMain;
import Stage = Laya.Stage;


Laya.init(1136, 640, Laya.WebGL);
// 设置适配模式
Laya.stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
Laya.stage.screenMode = Stage.SCREEN_VERTICAL;

//显示FPS
// Laya.Stat.show(0, 50);

let asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSource);
Laya.loader.load(asset, new Laya.Handler(this, () => {
    asset = null;
    utl.comeToLobby();
}));