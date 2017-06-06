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
    var Frog = (function (_super) {
        __extends(Frog, _super);
        function Frog() {
            var _this = _super.call(this) || this;
            //event
            _this.ACTIONEND = "actionEnd";
            _this.speedX = 0; //速度X
            _this.speedY = 0; //速度Y
            //动画播放时间间隔
            if (!Frog.cached) {
                Frog.cached = true;
                Laya.Animation.createFrames(["frog/tiao_01.png"], Frog.ACTIONS.stand);
                Laya.Animation.createFrames(["frog/tiao_01.png", "frog/tiao_02.png", "frog/tiao_03.png"], Frog.ACTIONS.jump);
                Laya.Animation.createFrames(["frog/tiao_04.png"], Frog.ACTIONS.flyUp);
                Laya.Animation.createFrames(["frog/tiao_04.png", "frog/tiao_05.png", "frog/tiao_06.png"], Frog.ACTIONS.upToDown);
                Laya.Animation.createFrames(["frog/tiao_07.png"], Frog.ACTIONS.flyDown);
                Laya.Animation.createFrames(["frog/tiao_07.png", "frog/tiao_08.png", "frog/tiao_09.png"], Frog.ACTIONS.landing);
                Laya.Animation.createFrames(["frog/tiao_01.png", "frog/zha_01.png", "frog/zha_02.png", "frog/zha_03.png", "frog/zha_04.png"], Frog.ACTIONS.blast);
            }
            if (!_this.actionBody) {
                _this.actionBody = new Laya.Animation();
                _this.actionBody.interval = 50;
                _this.addChild(_this.actionBody);
                //增加动画播放完成监听
                _this.actionBody.on(Laya.Event.COMPLETE, _this, _this.onPlayComplete);
            }
            return _this;
        }
        //播放
        Frog.prototype.playAnimation = function (action) {
            this.actionName = action;
            this.actionBody.play(0, true, action);
            var bound = this.getBounds();
            this.size(bound.width, bound.height);
            this.pivot(bound.width / 2, bound.height);
            console.log("action.....", this.actionName);
        };
        //动画播放完成
        Frog.prototype.onPlayComplete = function () {
            console.log("播放动画完成......", this.actionName);
            var stop = false;
            if (this.actionName == Frog.ACTIONS.stand) {
                stop = true;
            }
            else if (this.actionName == Frog.ACTIONS.flyUp) {
            }
            else if (this.actionName == Frog.ACTIONS.jump) {
                stop = true;
            }
            else if (this.actionName == Frog.ACTIONS.upToDown) {
            }
            else if (this.actionName == Frog.ACTIONS.flyDown) {
                stop = true;
            }
            else if (this.actionName == Frog.ACTIONS.landing) {
            }
            else if (this.actionName == Frog.ACTIONS.blast) {
                stop = true;
            }
            this.event(this.ACTIONEND, this.actionName);
            if (stop) {
                this.actionBody.stop();
            }
        };
        return Frog;
    }(Laya.Sprite));
    Frog.ACTIONS = {
        stand: "stand",
        jump: "jump",
        flyUp: "flyUp",
        upToDown: "upToDown",
        flyDown: "flyDown",
        landing: "landing",
        blast: "blast",
    };
    Frog.cached = false;
    game.Frog = Frog;
})(game || (game = {}));
//# sourceMappingURL=Frog.js.map