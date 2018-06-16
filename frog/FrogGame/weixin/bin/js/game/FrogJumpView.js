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
    var FrogJumpView = /** @class */ (function (_super) {
        __extends(FrogJumpView, _super);
        function FrogJumpView() {
            var _this = _super.call(this) || this;
            _this.jump_small.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
            });
            _this.jump_big.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
            });
            _this.jump_small_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_small_fall.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_big_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            return _this;
        }
        FrogJumpView.prototype.playAction = function (actionName) {
            console.log("action....", actionName);
            if (actionName == FrogJumpView.ACTIONS.stand) {
                this.jump_stand.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_small) {
                this.jump_small.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_big) {
                this.jump_big.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_small_blast) {
                this.jump_small_blast.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_small_fall) {
                this.jump_small_fall.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_big_blast) {
                this.jump_big_blast.play(0, false);
            }
        };
        //event
        FrogJumpView.ACTIONEND = "actionEnd";
        FrogJumpView.EVENT_DIE = "event_die";
        FrogJumpView.EVENT_STOP = "event_stop";
        FrogJumpView.ACTIONS = {
            stand: "stand",
            jump_small: "jump_small",
            jump_big: "jump_big",
            jump_small_blast: "jump_small_blast",
            jump_small_fall: "jump_small_fall",
            jump_big_blast: "jump_big_blast",
        };
        return FrogJumpView;
    }(ui.game.FrogViewUI));
    game.FrogJumpView = FrogJumpView;
})(game || (game = {}));
//# sourceMappingURL=FrogJumpView.js.map