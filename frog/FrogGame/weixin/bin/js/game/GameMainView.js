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
    var Frog = game.Frog;
    var GameMainView = /** @class */ (function (_super) {
        __extends(GameMainView, _super);
        /**
         * @param gameMode 游戏模式
         */
        function GameMainView(gameMode) {
            var _this = _super.call(this) || this;
            _this.BEGINXPOS = 100; //开始位置
            _this.COUNTDOWNNUM = 3; //倒计时时间
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
            _this.img_bg.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
            _this.img_bg.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.label_control.on("click", _this, _this.gameControl);
            return _this;
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
                this.stepBig = false;
                this.frog.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) {
                if (difY > -100) {
                    return;
                }
                this.stepBig = true;
                this.frog.jumbBig();
            }
        };
        //游戏控制
        GameMainView.prototype.gameControl = function () {
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
        GameMainView.prototype.start = function () {
            this.gameStatus = 1;
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        // start() {
        //     let countDown = this.COUNTDOWNNUM;
        //     this.changeTime(countDown + "");
        //     this.label_time.zOrder = 3;
        //     this.label_time.visible = true;
        //     Laya.timer.loop(1000, this, () => {  //倒计时
        //         countDown--;
        //         if (countDown < 0) {
        //             this.gameStatus = 1;
        //             this.label_time.visible = false;
        //             Laya.timer.clearAll(this);
        //             Laya.timer.frameLoop(1, this, this.onLoop);
        //             this.label_control.visible = true;
        //             return;
        //         }
        //         this.changeTime(countDown + "");
        //         Laya.Tween.to(this.label_score, { scaleX: 1, scaleY: 1 }, 500);
        //     });
        // }
        // changeTime(str) {
        //     this.label_time.scale(2, 2);
        //     this.label_time.changeText(str);
        //     Laya.Tween.to(this.label_time, { scaleX: 1, scaleY: 1 }, 500);
        // }
        //暂停
        GameMainView.prototype.pause = function () {
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
            var oView = new game.GameOverView;
            // oView.on(oView.PLAYAGIN, this, () => {
            //     this.playAgin();
            // });
            // oView.on(oView.BACK, this, () => {
            //     this.quit();
            // });
            Laya.stage.addChild(oView);
        };
        //再来一局
        GameMainView.prototype.playAgin = function () {
            this.clearGame();
            this.init();
            // this.start();
        };
        //清理游戏
        GameMainView.prototype.clearGame = function () {
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
            var lobbyMian = new lobby.LobbyMainView;
            Laya.stage.addChild(lobbyMian);
            this.destroy();
        };
        ///////////游戏逻辑/////////////////
        //游戏初始化
        GameMainView.prototype.init = function () {
            var _this = this;
            //操作提示界面
            this.box_tips.visible = true;
            this.sp_tips.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.box_tips.on(Laya.Event.CLICK, this, function () {
                _this.box_tips.visible = false;
                _this.ani_go.play(0, false);
            });
            this.ani_go.on(Laya.Event.COMPLETE, this, function () {
                console.log("ddddddd", "ssssssssssssss");
                Laya.timer.frameLoop(1, _this, _this.onLoop);
                _this.start();
            });
            //云层
            this.cloudsView = new game.CloudsView;
            this.sp_map.addChild(this.cloudsView);
            //远景
            this.farView = new game.FarView;
            this.sp_map.addChild(this.farView);
            //水
            this.waterView = new game.WaterView;
            this.waterView.y = Laya.stage.height - this.waterView.picHeight;
            this.waterView.zOrder = this.sp_map.zOrder + 1;
            this.box_tips.zOrder = this.waterView.zOrder + 1;
            this.addChild(this.waterView);
            this.farView.y = this.waterView.y - 209; //this.farView.picHeight;
            if (this.frog) {
                this.frog.destroy();
            }
            this.frog = new Frog;
            this.frog.on(this.frog.ACTIONEND, this, this.frogActionOver);
            this.sp_map.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.score = 0;
            this.label_score.changeText("分数：" + this.score);
            this.gameSpeed = GameConfig.SPEED;
            this.frog.initPos(this.lastXpos, this.pillarYPos);
            this.frog.playAnimation(Frog.ACTIONS.stand);
            this.frog.speedX = 0;
            this.lastHaveTrap = false;
            this.pillarShowArray = (game.Pillar.getPillarShowArray(true)).array;
            console.log("pillar...array.....", JSON.stringify(this.pillarShowArray));
            this.pillarIndex = 0;
            this.addPillar(this.lastXpos);
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
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
                // console.log("next...pillar...array...", JSON.stringify(this.pillarShowArray));
            }
            if (this.pillarShowArray[this.pillarIndex] == 2) {
                this.haveNullBefore = true;
            }
            else {
                this.haveNullBefore = false;
                var haveTrap = this.pillarShowArray[this.pillarIndex] == 3;
                var pillar = Laya.Pool.getItemByClass(game.Pillar.PILLARTAG, game.Pillar);
                pillar.init(this.lastXpos, this.pillarYPos, haveTrap);
                pillar.zOrder = 1;
                this.sp_map.addChild(pillar);
                this.pillarArray.push(pillar);
            }
            this.pillarIndex++;
        };
        //游戏循环
        GameMainView.prototype.onLoop = function () {
            if (this.frog.inJump) {
                this.frog.setSpeed();
                this.frog.y -= this.frog.speedY;
            }
            this.cloudsView.run(1);
            this.farView.run(1);
            this.waterView.run(1);
            var fSpeed = this.gameSpeed - this.frog.speedX;
            this.frog.x -= fSpeed;
            if (this.frog.x - this.frog.width / 2 < 0 || this.frog.x + this.frog.width / 2 >= Laya.stage.width) {
                // this.frogBlast();
                // return;
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
                    //青蛙与柱子的碰撞 
                    if (this.frog.inJump) {
                        if (this.frog.y >= this.pillarYPos && this.frog.x > p.x - p.width / 2 - this.frog.width / 2 && this.frog.x < p.x + p.width / 2) {
                            if (Math.abs(this.frog.x - p.x) < p.width / 2) {
                                if (p.haveTrap) {
                                    this.frogBlast();
                                }
                                else {
                                    this.frog.x = p.x; //要漏一帧的速度
                                    this.score += this.stepBig ? 2 : 1;
                                    this.label_score.changeText("分数：" + this.score);
                                    this.frog.playAnimation(Frog.ACTIONS.landing);
                                    if (this.score > 10 && this.speedAddTag < 1) {
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                        console.log("加速......10....");
                                    }
                                    if (this.score > 30 && this.speedAddTag < 2) {
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 50 && this.speedAddTag < 3) {
                                        this.gameSpeed += 2;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 80 && this.speedAddTag < 4) {
                                        this.gameSpeed += 2;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 100 && this.speedAddTag < 5) {
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 120 && this.speedAddTag < 6) {
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 150 && this.speedAddTag < 7) {
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 200 && this.speedAddTag < 8) {
                                        this.gameSpeed += 2;
                                        this.speedAddTag++;
                                    }
                                }
                            }
                            else if (this.frog.y + this.frog.width / 2 >= this.pillarArray[i].x - this.pillarArray[i].width / 2) {
                                this.frogBlast();
                            }
                        }
                    }
                }
                var lastXpos = this.pillarArray[this.pillarArray.length - 1].x;
                if (lastXpos <= Laya.stage.width) {
                    this.addPillar();
                }
            }
        };
        //青蛙爆炸
        GameMainView.prototype.frogBlast = function () {
            console.log("死了.......");
            this.pause();
            this.frog.playAnimation(Frog.ACTIONS.blast);
        };
        //青蛙动作结束
        GameMainView.prototype.frogActionOver = function (actionName) {
            // console.log("监听动画结束。。。。。", actionName, Frog.ACTIONS.landing);
            if (actionName == Frog.ACTIONS.stand) {
            }
            else if (actionName == Frog.ACTIONS.flyUp) {
            }
            else if (actionName == Frog.ACTIONS.jump) {
            }
            else if (actionName == Frog.ACTIONS.upToDown) {
            }
            else if (actionName == Frog.ACTIONS.flyDown) {
            }
            else if (actionName == Frog.ACTIONS.landing) {
            }
            else if (actionName == Frog.ACTIONS.blast) {
                this.gameOver();
            }
        };
        return GameMainView;
    }(ui.game.GameMainUI));
    game.GameMainView = GameMainView;
})(game || (game = {}));
//# sourceMappingURL=GameMainView.js.map