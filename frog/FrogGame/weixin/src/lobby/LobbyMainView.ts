namespace lobby {
    import GameMainView = game.GameMainView;
    import FrogJumpView = game.FrogJumpView;
    export class LobbyMainView extends ui.lobby.LobbyMianUI {

        index = 0;
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.label_begin.on(Laya.Event.CLICK, this, this.beginGame);


            if(wx) {
            var bodyConfig: BodyConfig = new BodyConfig();
            // bodyConfig.appId = "gh_0e3372b7e621";
            // bodyConfig.debug = true;
            /// ... 其他的配置属性赋值
            /// 通过config接口注入权限验证配置
                wx.config(bodyConfig);
                wx.ready(function() {
                /// 在这里调用微信相关功能的 API
                });
            }

            let frog1 = new game.FrogJumpView;
            this.addChild(frog1);
            frog1.x = 200;
            frog1.y = 200;
            frog1.playAction(FrogJumpView.ACTIONS.stand)

            let b = new Laya.Box;
            b.size(Laya.stage.width, Laya.stage.height);
            this.addChild(b);
            
            b.on(Laya.Event.CLICK, this, () => {
                console.log("mmmmmmm", "yyyyyyyyyyyy" + this.index);
                this.index++;
                switch (this.index) {
                    case 0:
                        frog1.playAction(FrogJumpView.ACTIONS.stand)
                        break;
                    case 1:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_small)
                        break;
                    case 2:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_big)
                        break;
                    case 3:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_small_blast)
                        break;
                    case 4:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_small_fall)
                        break;
                    case 5:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_big_blast)
                        break;
                    case 6:
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