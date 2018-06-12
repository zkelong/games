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
    var GameConfig = def.GameConfig;
    var Frog = /** @class */ (function (_super) {
        __extends(Frog, _super);
        function Frog() {
            var _this = _super.call(this) || this;
            //event
            _this.ACTIONEND = "actionEnd";
            _this.beginPos = { x: 0, y: 0 }; //开始的位置
            _this.speedX = 0; //速度X
            _this.speedY = 0; //速度Y
            _this.acceleratedY = 1; //y上的加速度
            // jumpTime: number = 0; //跳跃时间
            _this.inJump = false; //是否正在跳跃
            //播放
            _this.haveSize = false;
            //计算速度
            _this.havePlayUpToDown = false;
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
                _this.actionBody.interval = 20;
                _this.actionBody.scale(2, 2);
                _this.addChild(_this.actionBody);
                //增加动画播放完成监听
                _this.actionBody.on(Laya.Event.COMPLETE, _this, _this.onPlayComplete);
            }
            return _this;
        }
        Frog.prototype.playAnimation = function (action) {
            this.actionName = action;
            this.actionBody.play(0, true, action);
            if (!this.haveSize && action == Frog.ACTIONS.stand) {
                var bound = this.getBounds();
                this.size(bound.width, bound.height);
                this.pivot(bound.width / 2, bound.height);
            }
            if (action == Frog.ACTIONS.jump) { //起跳
                this.inJump = true;
            }
            else if (this.actionName == Frog.ACTIONS.blast) { //爆炸
                this.inJump = false;
                this.speedY = 0;
                this.acceleratedY = 0;
                this.speedX = 0;
            }
            else if (this.actionName == Frog.ACTIONS.landing) { //落地
                this.speedY = 0;
                this.acceleratedY = 0;
                this.speedX = 0;
                this.inJump = false;
            }
        };
        //动画播放完成
        Frog.prototype.onPlayComplete = function () {
            var stop = false;
            if (this.actionName == Frog.ACTIONS.stand) { //静止
                stop = true;
            }
            else if (this.actionName == Frog.ACTIONS.jump) { //起跳
                this.playAnimation(Frog.ACTIONS.flyUp);
            }
            else if (this.actionName == Frog.ACTIONS.flyUp) { //起飞
                stop = true;
            }
            else if (this.actionName == Frog.ACTIONS.upToDown) { //上升变下降
                this.playAnimation(Frog.ACTIONS.flyDown);
            }
            else if (this.actionName == Frog.ACTIONS.flyDown) { //下降
                stop = true;
            }
            else if (this.actionName == Frog.ACTIONS.landing) { //落地
                this.playAnimation(Frog.ACTIONS.stand);
            }
            else if (this.actionName == Frog.ACTIONS.blast) { //爆炸
                stop = true;
            }
            this.event(this.ACTIONEND, this.actionName);
            if (stop) {
                this.actionBody.stop();
            }
        };
        //设置初始位置
        Frog.prototype.initPos = function (x, y) {
            this.pos(x, y);
            this.beginPos = { x: x, y: y };
        };
        Frog.prototype.setSpeed = function () {
            if (this.speedY <= 0 && !this.havePlayUpToDown) { //开始下降
                this.havePlayUpToDown = true;
                this.playAnimation(Frog.ACTIONS.upToDown);
            }
            this.speedY -= this.acceleratedY;
        };
        //小跳
        Frog.prototype.jumpSmall = function () {
            this.speedX = 10;
            this.acceleratedY = 4;
            this.jumpOperate(GameConfig.SMALLSTEP);
        };
        //大跳
        Frog.prototype.jumbBig = function () {
            this.speedX = 20;
            this.acceleratedY = 8;
            this.jumpOperate(GameConfig.BIGSTEP);
        };
        //跳跃操作
        Frog.prototype.jumpOperate = function (setpWidth) {
            this.havePlayUpToDown = false;
            this.speedY = 0.5 * this.acceleratedY * setpWidth / this.speedX;
            this.playAnimation(Frog.ACTIONS.jump);
        };
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
        return Frog;
    }(Laya.Sprite));
    game.Frog = Frog;
})(game || (game = {}));
//# sourceMappingURL=Frog.js.map