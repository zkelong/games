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
    var Game = game.GameMain;
    var LobbyMain = (function (_super) {
        __extends(LobbyMain, _super);
        function LobbyMain() {
            var _this = _super.call(this) || this;
            _this.size(Laya.stage.width, Laya.stage.height);
            // console.log("stage....width....", this.width, this.height);
            _this.label_begin.on(Laya.Event.CLICK, _this, _this.beginGame);
            return _this;
        }
        LobbyMain.prototype.beginGame = function () {
            var game = new Game(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        };
        return LobbyMain;
    }(ui.lobby.LobbyMainUI));
    lobby.LobbyMain = LobbyMain;
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyMain.js.map