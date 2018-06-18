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
    var FrogView = /** @class */ (function (_super) {
        __extends(FrogView, _super);
        function FrogView() {
            var _this = _super.call(this) || this;
            //event
            _this.ACTIONEND = "actionEnd";
            _this.actionName = "";
            _this.beginPos = { x: 0, y: 0 }; //开始的位置
            _this.speedX = 0; //速度X
            _this.speedY = 0; //速度Y
            _this.beginYSpeed = 0; //开始的y速度
            _this.acceleratedY = 1; //y上的加速度
            _this.inJump = false; //是否正在跳跃
            _this.flying = false; //移动中
            _this.jSmall = true;
            _this.havePlayUpToDown = false;
            _this.pivot(_this.width / 2, _this.height);
            _this.scale(2, 2);
            _this.ani_jump.on(Laya.Event.COMPLETE, _this, function () {
                //起跳动作完成
                if (_this.jSmall) {
                    _this.speedX = 10;
                    _this.acceleratedY = 4;
                    _this.jumpOperate(GameConfig.SMALLSTEP);
                }
                else {
                    _this.speedX = 20;
                    _this.acceleratedY = 6;
                    _this.jumpOperate(GameConfig.BIGSTEP);
                }
                _this.flying = true;
                // console.log("jump complete", this.speedX, this.speedY);
            });
            // this.ani_land.on(Laya.Event.COMPLETE, this, ()=> {
            //     this.flying = false;
            // });
            _this.ani_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.flying = false;
            });
            return _this;
        }
        //设置初始位置
        FrogView.prototype.initPos = function (x, y) {
            this.pos(x, y);
            this.beginPos = { x: x, y: y };
        };
        FrogView.prototype.playAnimation = function (action) {
            if (action == this.actionName) {
                return;
            }
            this.actionName = action;
            this.img1.visible = true;
            console.log("frg.action", action);
            if (action == FrogView.ACTIONS.stand) {
                this.ani_stand.play(0, false);
            }
            else if (action == FrogView.ACTIONS.jump) {
                this.inJump = true;
                this.ani_jump.play(0, false);
            }
            else if (action == FrogView.ACTIONS.flyup) {
                this.ani_flyup.play(0, false);
            }
            else if (action == FrogView.ACTIONS.upToDown) {
                this.ani_uptodown.play(0, false);
            }
            else if (action == FrogView.ACTIONS.landing) {
                this.ani_uptodown.stop();
                this.ani_land.play(0, false);
            }
            else if (action == FrogView.ACTIONS.blast) {
                this.flying = false;
                this.speedY = 0;
                this.acceleratedY = 0;
                this.speedX = 0;
                this.img1.visible = false;
                this.ani_blast.play(0, false);
            }
        };
        //停止
        FrogView.prototype.stop = function () {
            this.flying = false;
            this.inJump = false;
            this.speedY = 0;
            this.acceleratedY = 0;
            this.speedX = 0;
            this.ani_stand.play(0, false);
            console.log("frg.stop", "stop");
        };
        FrogView.prototype.setSpeed = function () {
            if (this.speedY <= 1 && !this.havePlayUpToDown) {
                this.havePlayUpToDown = true;
                this.playAnimation(game.Frog.ACTIONS.upToDown);
            }
            this.speedY -= this.acceleratedY;
            // console.log("SPEEDY....", this.speedY, this.beginYSpeed);
            // if(this.speedY <= -this.beginYSpeed + this.acceleratedY) {
            //     this.playAnimation(FrogView.ACTIONS.landing);
            // }
        };
        //小跳
        FrogView.prototype.jumpSmall = function () {
            this.jSmall = true;
            this.playAnimation(game.Frog.ACTIONS.jump);
        };
        //大跳
        FrogView.prototype.jumpBig = function () {
            this.jSmall = true;
            this.playAnimation(game.Frog.ACTIONS.jump);
        };
        //跳跃操作
        FrogView.prototype.jumpOperate = function (setpWidth) {
            this.havePlayUpToDown = false;
            this.speedY = 0.5 * this.acceleratedY * setpWidth / this.speedX;
            this.beginYSpeed = this.speedY;
            console.log("SPEEDY...init.", this.speedY, this.beginYSpeed);
        };
        FrogView.ACTIONS = {
            stand: "stand",
            jump: "jump",
            flyup: "flyUp",
            upToDown: "upToDown",
            landing: "landing",
            blast: "blast",
        };
        return FrogView;
    }(ui.game.FrogUI));
    game.FrogView = FrogView;
})(game || (game = {}));
//# sourceMappingURL=FrogView.js.map