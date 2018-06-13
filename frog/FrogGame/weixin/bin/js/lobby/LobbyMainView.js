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
    var LobbyMainView = /** @class */ (function (_super) {
        __extends(LobbyMainView, _super);
        function LobbyMainView() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.label_begin.on(Laya.Event.CLICK, _this, _this.beginGame);
            var frog1 = new game.Frog;
            _this.addChild(frog1);
            frog1.x = 200;
            frog1.y = 200;
            frog1.playAnimation(game.Frog.ACTIONS.all);
            var b = new Laya.Box;
            b.size(Laya.stage.width, Laya.stage.height);
            _this.addChild(b);
            b.on(Laya.Event.CLICK, _this, function () {
                console.log("mmmmmmm", "yyyyyyyyyyyy" + _this.index);
                _this.index++;
                switch (_this.index) {
                    case 0:
                        frog1.playAnimation(game.Frog.ACTIONS.stand);
                        break;
                    case 1:
                        frog1.playAnimation(game.Frog.ACTIONS.jump);
                        break;
                    case 2:
                        frog1.playAnimation(game.Frog.ACTIONS.flyUp);
                        break;
                    case 3:
                        frog1.playAnimation(game.Frog.ACTIONS.upToDown);
                        break;
                    case 4:
                        frog1.playAnimation(game.Frog.ACTIONS.flyDown);
                        break;
                    case 5:
                        frog1.playAnimation(game.Frog.ACTIONS.landing);
                        break;
                    case 6:
                        frog1.playAnimation(game.Frog.ACTIONS.blast);
                        break;
                    case 7:
                        frog1.playAnimation(game.Frog.ACTIONS.all);
                        break;
                    case 8:
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