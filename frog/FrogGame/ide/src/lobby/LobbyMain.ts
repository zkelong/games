namespace lobby {
    import Game = game.GameMain;
    export class LobbyMain extends ui.lobby.LobbyMainUI{
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            // console.log("stage....width....", this.width, this.height);
            this.label_begin.on(Laya.Event.CLICK, this, this.beginGame);
        }

        beginGame() {
            let game = new Game(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        }
    }
}