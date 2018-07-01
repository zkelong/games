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
//游戏主界面
var game;
(function (game) {
    var GameConfig = def.GameConfig;
    var Frog = game.FrogJumpView;
    var GameMainView = /** @class */ (function (_super) {
        __extends(GameMainView, _super);
        /**
         * @param gameMode 游戏模式
         */
        function GameMainView(gameMode) {
            var _this = _super.call(this) || this;
            _this.BEGINXPOS = 180; //开始位置
            _this.COUNTDOWNNUM = 3; //倒计时时间
            _this.roadIndex = 0; //青蛙再路上位置
            _this.roadArray = []; //0-没有柱子，1-正常柱子，2-有刺柱子
            _this.jumpToBlast = false; //要爆
            _this.havePlayBlast = false;
            _this.gameStatus = 0; //游戏状态 0--暂停中，1--进行中
            _this.pillarArray = []; //柱子对象
            _this.lastStepBig = true; //上一次间隔是大间隔
            _this.lastHaveTrap = false; //上次有陷阱
            _this.score = 0; //分数
            _this.stepBig = false; //跳跃是否为大跳
            _this.speedAddTag = 0; //游戏速度加速次数标记
            ////////////////界面操作///////////////
            _this.mousePos = { time: 0, x: 0, y: 0 };
            _this.pillarYPos = Laya.stage.height - 587; // * 2 / 5;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.gameMode = gameMode;
            _this.init();
            // this.start();
            _this.box_control.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
            _this.box_control.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
            return _this;
            // this.label_control.on("click", this, this.gameControl);
            // this.on(Event.RESIZE, this, () => {
            //     this.graphics.drawRect(0,0, this.width, this.height, this.color);
            // });
        }
        //鼠标按下
        GameMainView.prototype.onMouseDown = function () {
            this.mousePos.x = this.mouseX;
            this.mousePos.y = this.mouseY;
            this.mousePos.time = new Date().valueOf();
        };
        //鼠标弹起
        GameMainView.prototype.onMouseUp = function () {
            // if (this.gameStatus != 1) { //游戏进行中
            //     // console.log("未进行，操作无效");
            //     return;
            // }
            if (this.frog.inJump) {
                // console.log("未落地，操作无效");
                return;
            }
            var endTime = new Date().valueOf();
            if (endTime - this.mousePos.time > 1200) {
                return;
            }
            var difX = this.mouseX - this.mousePos.x;
            var difY = this.mouseY - this.mousePos.y;
            var angle = Math.atan2(difY, difX);
            if (angle < Math.PI / 6 && angle > 0 || angle >= -Math.PI / 6 && angle < 0) {
                if (difX < 100) {
                    return;
                }
                if (this.gameStatus != 1) {
                    this.start();
                }
                this.stepBig = false;
                this.score++;
                this.gameSpeed += 0.04;
                this.label_score.text = "分数：" + this.score;
                this.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) {
                if (difY > -100) {
                    return;
                }
                if (this.gameStatus != 1) {
                    this.start();
                }
                this.stepBig = true;
                this.jumbBig();
                this.score++;
                this.gameSpeed += 0.04;
                this.label_score.text = "分数：" + this.score;
            }
        };
        GameMainView.prototype.jumpSmall = function () {
            this.roadIndex += 1;
            //0-没有柱子，1-正常柱子，2-有刺柱子
            if (this.roadArray[this.roadIndex] == 0) {
                this.jumpToBlast = true;
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small_fall);
            }
            else if (this.roadArray[this.roadIndex] == 1) {
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small);
            }
            else {
                this.jumpToBlast = true;
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small_blast);
            }
        };
        GameMainView.prototype.jumbBig = function () {
            this.roadIndex += 2;
            //0-没有柱子，1-正常柱子，2-有刺柱子
            if (this.roadArray[this.roadIndex] == 0) {
                this.jumpToBlast = true;
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big_fall);
            }
            else if (this.roadArray[this.roadIndex] == 1) {
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big);
            }
            else {
                this.jumpToBlast = true;
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big_blast);
            }
        };
        //开始
        GameMainView.prototype.start = function () {
            this.gameStatus = 1;
            // this.visible = true;
            // this.label_jump.pos(this.frog.x , this.frog.y - 50);
            utl.MusicSoundTool.playMusic(def.MusicConfig.CommonMusic.game_bg);
            this.label_jump.visible = false;
            this.label_jump.ani_play.stop();
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        //暂停
        GameMainView.prototype.pause = function () {
            utl.MusicSoundTool.stopMusic();
            this.gameStatus = 0;
            Laya.timer.clearAll(this);
        };
        //继续
        GameMainView.prototype.continue = function () {
            this.gameStatus = 1;
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        //游戏结束
        GameMainView.prototype.gameOver = function () {
            var _this = this;
            this.pause();
            this.label_score.text = "";
            var oView = new game.GameOverView(this.score);
            oView.zOrder = 100;
            this.addChild(oView);
            //再来一把
            oView.on(oView.AGIN, this, function () {
                _this.score = 0;
                _this.playAgin();
            });
            //继续
            oView.on(oView.ADEND, this, function () {
                _this.playAgin();
            });
        };
        //再来一局
        GameMainView.prototype.playAgin = function () {
            this.clearGame();
            this.initGoods();
            this.label_jump.ani_play.play(0, true);
            this.label_jump.visible = true;
        };
        //清理游戏
        GameMainView.prototype.clearGame = function () {
            this.jumpToBlast = false; //要爆
            this.havePlayBlast = false;
            //回收柱子
            for (var i = this.pillarArray.length - 1; i > -1; i--) {
                this.pillarArray[i].removeSelf();
                Laya.Pool.recover(game.Pillar.PILLARTAG, this.pillarArray[i]);
                this.pillarArray.pop();
            }
        };
        //退出
        GameMainView.prototype.quit = function () {
            Laya.timer.clearAll(this);
            this.frog.destroy();
            Laya.Pool.clearBySign(game.Pillar.PILLARTAG);
            this.destroy();
            // utl.comeToLobby();
            // let lobbyMian = new lobby.LobbyMainView;
            // Laya.stage.addChild(lobbyMian);
            this.destroy();
        };
        ///////////游戏逻辑/////////////////
        //游戏初始化
        GameMainView.prototype.init = function () {
            var _this = this;
            this.graphics.drawRect(0, 0, this.width, this.height, "#3584fb");
            //滚动背景
            this.bgView = new game.RepeatImageView("frog/bg.png");
            this.bgView.pos(0, this.height - this.bgView.contentHeight);
            this.bgView.zOrder = -99;
            this.addChild(this.bgView);
            //建筑景物
            this.buildingView = new game.RepeatImageView("frog/yuanjingcen.png");
            this.sp_map.addChild(this.buildingView);
            //水
            this.waterView = new game.WaterView;
            this.waterView.y = Laya.stage.height - this.waterView.picHeight;
            this.waterView.zOrder = this.sp_map.zOrder + 1;
            this.box_tips.zOrder = this.waterView.zOrder + 1;
            this.addChild(this.waterView);
            this.buildingView.y = this.waterView.y - 209;
            this.sp_tips.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.sp_white.graphics.drawRect(0, 0, this.width, this.height, "#ffffff");
            this.box_tips.on(Laya.Event.CLICK, this, function () {
                _this.box_labels.visible = false;
                _this.box_tips.visible = false;
                _this.label_jump.visible = true;
                _this.label_jump.ani_play.play(0, true);
            });
            this.label_jump = new ui.comp.LabelScaleAniUI;
            this.sp_map.addChild(this.label_jump);
            this.label_jump.visible = false;
            this.initGoods();
        };
        GameMainView.prototype.initGoods = function () {
            if (this.frog) {
                this.frog.destroy();
            }
            this.frog = new Frog;
            this.roadIndex = 0;
            this.roadArray = [];
            this.frog.on(game.FrogJumpView.ACTIONEND, this, this.frogActionOver);
            this.sp_map.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.label_score.text = "分数：" + this.score;
            this.gameSpeed = GameConfig.SPEED;
            this.frog.initPos(this.lastXpos, this.pillarYPos);
            this.frog.playAction(game.FrogJumpView.ACTIONS.stand);
            this.lastHaveTrap = false;
            this.pillarShowArray = (game.Pillar.getPillarShowArray(true)).array;
            this.pillarIndex = 0;
            this.addPillar(this.lastXpos);
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
            this.label_jump.pos(this.frog.x - this.label_jump.width / 2, this.frog.y - 80);
        };
        //增加柱子
        GameMainView.prototype.addPillar = function (xPos) {
            if (!xPos) {
                this.lastXpos = this.haveNullBefore ? this.pillarArray[this.pillarArray.length - 1].x + GameConfig.SMALLSTEP * 2 : this.pillarArray[this.pillarArray.length - 1].x + GameConfig.SMALLSTEP;
            }
            if (this.pillarIndex == this.pillarShowArray.length) {
                var ret = game.Pillar.getPillarShowArray(false, this.pillarArrayIndex);
                this.pillarShowArray = ret.array;
                this.pillarArrayIndex = ret.idx;
                this.pillarIndex = 0;
            }
            if (this.pillarShowArray[this.pillarIndex] == 2) {
                this.haveNullBefore = true;
                this.roadArray.push(0);
            }
            else {
                this.haveNullBefore = false;
                var haveTrap = this.pillarShowArray[this.pillarIndex] == 3;
                var pillar = Laya.Pool.getItemByClass(game.Pillar.PILLARTAG, game.Pillar);
                pillar.init(this.lastXpos, this.pillarYPos, haveTrap);
                pillar.zOrder = 1;
                this.sp_map.addChild(pillar);
                this.pillarArray.push(pillar);
                if (haveTrap) {
                    this.roadArray.push(2);
                }
                else {
                    this.roadArray.push(1);
                }
            }
            this.pillarIndex++;
        };
        //游戏循环
        GameMainView.prototype.onLoop = function () {
            //布景移动
            this.waterView.run(this.gameSpeed + 0.1);
            this.buildingView.run(this.gameSpeed - 1);
            this.bgView.run(this.gameSpeed - 1.5);
            this.frog.x -= this.gameSpeed;
            var frogX = this.frog.getRealPosX();
            //青蛙与墙壁碰撞
            if (frogX <= 0 || frogX > this.width) {
                if (frogX <= 0) {
                    frogX = +27;
                }
                else {
                    frogX = this.width - 27;
                }
                var frogY = this.frog.getRealPosY();
                this.pause();
                this.frog.initPos(frogX, frogY);
                this.frog.playAction(game.FrogJumpView.ACTIONS.stand_blast);
            }
            //要爆
            if (this.jumpToBlast) {
                var frogY = this.frog.getRealPosY();
                if (frogY <= this.pillarYPos - 4 && !this.havePlayBlast) {
                    this.havePlayBlast = true;
                    utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.blast);
                }
            }
            if (this.pillarArray.length) {
                for (var i = this.pillarArray.length - 1; i > -1; i--) {
                    var p = this.pillarArray[i];
                    p.x -= this.gameSpeed;
                    if (this.pillarArray[i].x < -GameConfig.PILLARWIDTH / 2) {
                        //回收
                        Laya.Pool.recover(game.Pillar.PILLARTAG, p);
                        this.pillarArray.shift();
                    }
                }
                var lastXpos = this.pillarArray[this.pillarArray.length - 1].x;
                if (lastXpos <= Laya.stage.width) {
                    this.addPillar();
                }
            }
        };
        //青蛙动作结束
        GameMainView.prototype.frogActionOver = function (eventName) {
            if (eventName == game.FrogJumpView.EVENT_STOP) {
            }
            else if (eventName == game.FrogJumpView.EVENT_DIE) {
                this.frog.visible = false;
                this.gameOver();
            }
        };
        return GameMainView;
    }(ui.game.GameMainUI));
    game.GameMainView = GameMainView;
})(game || (game = {}));
//# sourceMappingURL=GameMainView.js.map