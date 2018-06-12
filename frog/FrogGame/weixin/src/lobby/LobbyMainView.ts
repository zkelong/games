namespace lobby {
    import GameMainView = game.GameMainView;
    export class LobbyMainView extends ui.lobby.LobbyMianUI{
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.label_begin.on(Laya.Event.CLICK, this, this.beginGame);
        }

        beginGame() {
            let game = new GameMainView(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        }
    }
}