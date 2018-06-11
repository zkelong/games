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
var game;
(function (game) {
    var GameOverView = /** @class */ (function (_super) {
        __extends(GameOverView, _super);
        function GameOverView() {
            var _this = _super.call(this) || this;
            _this.size(Laya.stage.width, Laya.stage.height);
            return _this;
        }
        return GameOverView;
    }(ui.game.GameOverUI));
    game.GameOverView = GameOverView;
})(game || (game = {}));
//# sourceMappingURL=GameOverView.js.map