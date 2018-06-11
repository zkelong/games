namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;

    export class GameOverView extends ui.game.GameOverUI {
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
        }
    }
}
