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
    var AdView = ad.AdView;
    var GameMain = (function (_super) {
        __extends(GameMain, _super);
        /**
         * @param gameMode 游戏模式
         */
        function GameMain(gameMode) {
            var _this = _super.call(this) || this;
            _this.BEGINXPOS = 150; //开始位置
            _this.COUNTDOWNNUM = 3; //倒计时时间
            _this.gameStatus = 0; //游戏状态 0--暂停中，1--进行中
            _this.pillarArray = []; //柱子对象
            _this.lastStepBig = true; //上一次间隔是大间隔
            _this.lastHaveTrap = false; //上次有陷阱
            _this.score = 0; //分数
            ////////////////界面操作///////////////
            _this.mousePos = { time: 0, x: 0, y: 0 };
            _this.pillarYPos = Laya.stage.height * 3 / 5;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.gameMode = gameMode;
            _this.init();
            _this.start();
            _this.img_bg.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
            _this.img_bg.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.label_control.on("click", _this, _this.gameControl);
            return _this;
        }
        //鼠标按下
        GameMain.prototype.onMouseDown = function () {
            this.mousePos.x = this.mouseX;
            this.mousePos.y = this.mouseY;
            this.mousePos.time = new Date().valueOf();
        };
        //鼠标弹起
        GameMain.prototype.onMouseUp = function () {
            if (this.gameStatus != 1) {
                console.log("未进行，操作无效");
                return;
            }
            if (this.frog.inJump) {
                console.log("未落地，操作无效");
                return;
            }
            var endTime = new Date().valueOf();
            if (endTime - this.mousePos.time > 1200) {
                return;
            }
            var difX = this.mouseX - this.mousePos.x;
            var difY = this.mouseY - this.mousePos.y;
            var angle = Math.atan2(difY, difX);
            // console.log("xxxxxxxxxxxxxxxxx...鼠标操作........", difX, difY, angle);
            if (angle < Math.PI / 6 && angle > 0 || angle >= -Math.PI / 6 && angle < 0) {
                if (difX < 100) {
                    return;
                }
                this.frog.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) {
                if (difY > -100) {
                    return;
                }
                this.frog.jumbBig();
            }
        };
        //游戏控制
        GameMain.prototype.gameControl = function () {
            console.log("control...........", this.gameStatus);
            if (this.gameStatus == 1) {
                this.label_control.changeText("继续");
                this.pause();
            }
            else {
                this.label_control.changeText("暂停");
                this.continue();
            }
        };
        //开始
        GameMain.prototype.start = function () {
            var _this = this;
            var countDown = this.COUNTDOWNNUM;
            this.label_time.changeText(countDown + "");
            this.label_time.visible = true;
            Laya.timer.loop(1000, this, function () {
                if (countDown < 0) {
                    _this.gameStatus = 1;
                    _this.label_time.visible = false;
                    Laya.timer.clearAll(_this);
                    Laya.timer.frameLoop(1, _this, _this.onLoop);
                    _this.label_control.visible = true;
                    return;
                }
                _this.label_time.changeText(countDown + "");
                countDown--;
            });
        };
        //暂停
        GameMain.prototype.pause = function () {
            this.gameStatus = 0;
            Laya.timer.clearAll(this);
        };
        //继续
        GameMain.prototype.continue = function () {
            this.gameStatus = 1;
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        //游戏结束
        GameMain.prototype.gameOver = function () {
            var _this = this;
            var ad = new AdView();
            ad.on(ad.PLAYAGIN, this, function () {
                _this.playAgin();
            });
            ad.on(ad.BACK, this, function () {
                _this.quit();
            });
            Laya.stage.addChild(ad);
        };
        //再来一局
        GameMain.prototype.playAgin = function () {
            this.clearGame();
            this.init();
            this.start();
        };
        //清理游戏
        GameMain.prototype.clearGame = function () {
            //回收柱子
            for (var i = this.pillarArray.length - 1; i > -1; i--) {
                this.pillarArray[i].removeSelf();
                Laya.Pool.recover(game.Pillar.PILLARTAG, this.pillarArray[i]);
                this.pillarArray.pop();
            }
        };
        //退出
        GameMain.prototype.quit = function () {
            Laya.timer.clearAll(this);
            this.frog.destroy();
            Laya.Pool.clearBySign(game.Pillar.PILLARTAG);
            this.destroy();
            utl.comeToLobby();
        };
        ///////////游戏逻辑/////////////////
        //游戏初始化
        GameMain.prototype.init = function () {
            if (this.frog) {
                this.frog.destroy();
            }
            this.frog = new game.Frog;
            this.frog.on(this.frog.ACTIONEND, this, this.frogActionOver);
            this.gameMap.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.score = 0;
            this.frog.initPos(this.lastXpos, this.pillarYPos);
            this.frog.playAnimation(game.Frog.ACTIONS.stand);
            this.frog.speedX = 0;
            this.lastHaveTrap = false;
            this.addPillar(this.lastXpos);
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
        };
        //增加柱子
        GameMain.prototype.addPillar = function (xPos) {
            if (xPos) {
                this.lastXpos = xPos;
            }
            else {
                var ran = Math.random();
                if (this.lastHaveTrap) {
                    this.lastXpos += GameConfig.SMALLSTEP;
                    this.lastStepBig = false;
                }
                else {
                    if (ran < 0.5) {
                        this.lastXpos += GameConfig.SMALLSTEP;
                        this.lastStepBig = false;
                    }
                    else {
                        this.lastXpos += GameConfig.BIGSTEP;
                        this.lastStepBig = true;
                    }
                }
                if (!this.lastStepBig && !this.lastHaveTrap) {
                    this.lastHaveTrap = Math.random() < 0.8 ? true : false;
                }
                else {
                    this.lastHaveTrap = false;
                }
            }
            var pillar = Laya.Pool.getItemByClass(game.Pillar.PILLARTAG, game.Pillar);
            pillar.init(this.lastXpos, this.pillarYPos, this.lastHaveTrap);
            this.gameMap.addChild(pillar);
            this.pillarArray.push(pillar);
        };
        //游戏循环
        GameMain.prototype.onLoop = function () {
            if (this.frog.inJump) {
                this.frog.setSpeed();
                this.frog.y -= this.frog.speedY;
            }
            var fSpeed = GameConfig.SPEED - this.frog.speedX;
            this.frog.x -= fSpeed;
            if (this.frog.x - this.frog.width / 2 < 0 || this.frog.x + this.frog.width / 2 >= Laya.stage.width) {
                this.frogBlast();
                return;
            }
            if (this.pillarArray.length) {
                for (var i = this.pillarArray.length - 1; i > -1; i--) {
                    var p = this.pillarArray[i];
                    p.x -= GameConfig.SPEED;
                    if (this.pillarArray[i].x < -GameConfig.PILLARWIDTH / 2) {
                        //回收
                        Laya.Pool.recover(game.Pillar.PILLARTAG, p);
                        this.pillarArray.shift();
                    }
                    //青蛙与柱子的碰撞 
                    if (this.frog.inJump) {
                        if (this.frog.y >= this.pillarYPos && this.frog.x > p.x - p.width / 2 - this.frog.width / 2 && this.frog.x < p.x + p.width / 2) {
                            if (Math.abs(this.frog.x - p.x) < p.width / 2) {
                                if (p.haveTrap) {
                                    this.frogBlast();
                                }
                                else {
                                    this.frog.x = p.x; //要漏以帧的速度
                                    this.score++;
                                    this.label_score.changeText("分数：" + this.score);
                                    this.frog.playAnimation(game.Frog.ACTIONS.landing);
                                }
                            }
                            else if (this.frog.y + this.frog.width / 2 >= this.pillarArray[i].x - this.pillarArray[i].width / 2) {
                                this.frogBlast();
                            }
                        }
                    }
                }
                this.lastXpos = this.pillarArray[this.pillarArray.length - 1].x;
            }
            if (this.lastXpos + GameConfig.SMALLSTEP <= Laya.stage.width + GameConfig.BIGSTEP) {
                this.addPillar();
            }
        };
        //青蛙爆炸
        GameMain.prototype.frogBlast = function () {
            console.log("死了.......");
            this.pause();
            this.frog.playAnimation(game.Frog.ACTIONS.blast);
        };
        //青蛙动作结束
        GameMain.prototype.frogActionOver = function (actionName) {
            // console.log("监听动画结束。。。。。", actionName, Frog.ACTIONS.landing);
            if (actionName == game.Frog.ACTIONS.stand) {
            }
            else if (actionName == game.Frog.ACTIONS.flyUp) {
            }
            else if (actionName == game.Frog.ACTIONS.jump) {
            }
            else if (actionName == game.Frog.ACTIONS.upToDown) {
            }
            else if (actionName == game.Frog.ACTIONS.flyDown) {
            }
            else if (actionName == game.Frog.ACTIONS.landing) {
            }
            else if (actionName == game.Frog.ACTIONS.blast) {
                this.gameOver();
            }
        };
        return GameMain;
    }(ui.game.GameMainUI));
    game.GameMain = GameMain;
})(game || (game = {}));
//# sourceMappingURL=GameMain.js.map