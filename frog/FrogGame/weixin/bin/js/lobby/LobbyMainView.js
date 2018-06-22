var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var lobby;
(function (lobby) {
    var GameMainView = game.GameMainView;
    var FrogJumpView = game.FrogJumpView;
    var LobbyMainView = /** @class */ (function (_super) {
        __extends(LobbyMainView, _super);
        function LobbyMainView() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.label_begin.on(Laya.Event.CLICK, _this, _this.beginGame);
            if (wx) {
                var bodyConfig = new BodyConfig();
                // bodyConfig.appId = "gh_0e3372b7e621";
                // bodyConfig.debug = true;
                /// ... 其他的配置属性赋值
                /// 通过config接口注入权限验证配置
                wx.config(bodyConfig);
                wx.ready(function () {
                    /// 在这里调用微信相关功能的 API
                });
            }
            var frog1 = new game.FrogJumpView;
            _this.addChild(frog1);
            frog1.x = 200;
            frog1.y = 200;
            frog1.playAction(FrogJumpView.ACTIONS.stand);
            var b = new Laya.Box;
            b.size(Laya.stage.width, Laya.stage.height);
            _this.addChild(b);
            b.on(Laya.Event.CLICK, _this, function () {
                console.log("mmmmmmm", "yyyyyyyyyyyy" + _this.index);
                _this.index++;
                switch (_this.index) {
                    case 0:
                        frog1.playAction(FrogJumpView.ACTIONS.stand);
                        break;
                    case 1:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_small);
                        break;
                    case 2:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_big);
                        break;
                    case 3:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_small_blast);
                        break;
                    case 4:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_small_fall);
                        break;
                    case 5:
                        frog1.playAction(FrogJumpView.ACTIONS.jump_big_blast);
                        break;
                    case 6:
                        _this.index = 0;
                        break;
                }
            });
            return _this;
        }
        LobbyMainView.prototype.beginGame = function () {
            var game = new GameMainView(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        };
        return LobbyMainView;
    }(ui.lobby.LobbyMianUI));
    lobby.LobbyMainView = LobbyMainView;
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyMainView.js.map