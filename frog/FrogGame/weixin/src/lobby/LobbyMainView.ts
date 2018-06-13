namespace lobby {
    import GameMainView = game.GameMainView;
    export class LobbyMainView extends ui.lobby.LobbyMianUI{

        index = 0;
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.label_begin.on(Laya.Event.CLICK, this, this.beginGame);

            let frog1 = new game.Frog;
            this.addChild(frog1);
            frog1.x = 200;
            frog1.y = 200;
            frog1.playAnimation(game.Frog.ACTIONS.all)

            let b = new Laya.Box;
            b.size(Laya.stage.width, Laya.stage.height);
            this.addChild(b);
            
            b.on(Laya.Event.CLICK, this, ()=>{
                console.log("mmmmmmm", "yyyyyyyyyyyy" + this.index);
                this.index++;
                switch(this.index) {
                    case 0:
                        frog1.playAnimation(game.Frog.ACTIONS.stand)
                    break;
                    case 1:
                        frog1.playAnimation(game.Frog.ACTIONS.jump)
                    break;
                    case 2:
                        frog1.playAnimation(game.Frog.ACTIONS.flyUp)
                    break;
                    case 3:
                        frog1.playAnimation(game.Frog.ACTIONS.upToDown)
                    break;
                    case 4:
                        frog1.playAnimation(game.Frog.ACTIONS.flyDown)
                    break;
                    case 5:
                        frog1.playAnimation(game.Frog.ACTIONS.landing)
                    break;
                    case 6:
                        frog1.playAnimation(game.Frog.ACTIONS.blast)
                    break;
                    case 7:
                        frog1.playAnimation(game.Frog.ACTIONS.all)
                    break;
                    case 8:
                        this.index = 0;
                    break;
                }
            });
        }

        beginGame() {
            let game = new GameMainView(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        }
    }
}