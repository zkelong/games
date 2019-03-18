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
    var Tween = Laya.Tween;
    var Handler = laya.utils.Handler;
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
            _this.roadArray = []; //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
            _this.jumpToBlast = false; //要爆
            _this.havePlayBlast = false;
            _this.gameStatus = 0; //游戏状态 0--暂停中，1--进行中，2--结束
            _this.pillarArray = []; //柱子对象
            _this.lastStepBig = true; //上一次间隔是大间隔
            _this.lastHaveTrap = false; //上次有陷阱
            _this.score = 0; //分数
            _this.stepBig = false; //跳跃是否为大跳
            _this.speedAddTag = 0; //游戏速度加速次数标记
            _this.play_self = false;
            ////////////////界面操作///////////////
            _this.mousePos = { time: 0, x: 0, y: 0 };
            ///////道具处理///////////
            _this.propTime = 10; //道具加分
            _this.pillarYPos = Laya.stage.height - 587; // * 2 / 5;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.gameMode = gameMode;
            _this.init();
            // this.start();
            _this.box_control.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
            _this.box_control.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.label_score.on(Laya.Event.DOUBLE_CLICK, _this, function () {
                // this.play_self = !this.play_self; //自己跳
            });
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
            if (this.frog.inJump || this.frog.falling) { //未落地，操作无效
                return;
            }
            var endTime = new Date().valueOf();
            if (endTime - this.mousePos.time > 1200) { //操作时间过长，认为操作无效
                return;
            }
            var difX = this.mouseX - this.mousePos.x;
            var difY = this.mouseY - this.mousePos.y;
            var angle = Math.atan2(difY, difX);
            if (angle < Math.PI / 6 && angle > 0 || angle >= -Math.PI / 6 && angle < 0) { //右滑
                if (difX < 100) {
                    return;
                }
                this.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) { //上滑动
                if (difY > -100) {
                    return;
                }
                this.stepBig = true;
                this.jumpBig();
            }
        };
        GameMainView.prototype.jumpSmall = function () {
            this.setGameSpeed();
            this.setScore();
            var nowItem = this.roadArray[this.roadIndex];
            if (nowItem.tag == 4) {
                this.jumpToBlast = true;
                this.frog.playAction(game.FrogJumpView.ACTIONS.jump_up_blast);
                return;
            }
            this.roadIndex += 1;
            //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
            var item = this.roadArray[this.roadIndex];
            switch (item.tag) {
                case 1:
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small);
                    break;
                case 2:
                    this.jumpToBlast = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small_fall);
                    break;
                case 3:
                    this.jumpToBlast = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small_blast);
                    break;
                case 4:
                    this.frog.falling = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_small);
                    break;
            }
        };
        GameMainView.prototype.jumpBig = function () {
            this.setGameSpeed();
            this.setScore();
            var nowItem = this.roadArray[this.roadIndex];
            if (nowItem.tag == 4) {
                if (Math.random() < 0.2 && !this.play_self) { //概率炸
                    this.jumpToBlast = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_up_blast);
                }
                else {
                    this.roadIndex += 1;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_up);
                }
                return;
            }
            this.roadIndex += 2;
            //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
            var item = this.roadArray[this.roadIndex];
            switch (item.tag) {
                case 1:
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big);
                    break;
                case 2:
                    this.jumpToBlast = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big_fall);
                    break;
                case 3:
                    this.jumpToBlast = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big_blast);
                    break;
                case 4:
                    this.frog.falling = true;
                    this.frog.playAction(game.FrogJumpView.ACTIONS.jump_big);
                    break;
            }
        };
        GameMainView.prototype.setGameSpeed = function () {
            if (this.gameSpeed < 6) {
                this.gameSpeed += 0.04;
                this.frog.checkSpeed(this.gameSpeed);
            }
        };
        GameMainView.prototype.setScore = function () {
            if (this.label_jump.visible == true) { //提示
                this.label_jump.visible = false;
                this.label_jump.ani_play.stop();
            }
            this.score++;
            this.label_score.text = def.getLanguageStr(def.LanguageConfig.Keys.SCORE1) + this.score;
        };
        //开始
        GameMainView.prototype.start = function () {
            this.gameStatus = 1;
            // this.visible = true;
            // this.label_jump.pos(this.frog.x , this.frog.y - 50);
            Laya.timer.frameLoop(1, this, this.onLoop);
            this.beginWaterAction();
            utl.MusicSoundTool.playMusic(def.MusicConfig.CommonMusic.game_bg);
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
            this.gameStatus = 2;
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
            //继续
            oView.on(oView.BACKMAIN, this, function () {
                var lobbyMian = new lobby.LobbyMainView;
                Laya.stage.addChild(lobbyMian);
                _this.removeChildren();
                _this.removeSelf();
                _this.destroy();
            });
        };
        //再来一局
        GameMainView.prototype.playAgin = function () {
            this.clearGame();
            this.initGoods();
            this.gameStatus = 0;
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
            //云层
            this.cloudsView = new game.RepeatImageView("frog/yun.png");
            this.sp_map.addChild(this.cloudsView);
            this.cloudsView.y = 0;
            //石头
            this.stoneView = new game.ScrollView("frog/wuqi.png");
            this.addChild(this.stoneView);
            //水
            this.waterView = new game.ScrollView("frog/shui.png");
            this.waterView.y = Laya.stage.height - this.waterView.picHeight;
            this.waterView.zOrder = this.sp_map.zOrder + 1;
            this.box_tips.zOrder = this.waterView.zOrder + 1;
            this.addChild(this.waterView);
            this.buildingView.y = this.waterView.y - 200;
            this.stoneView.y = this.waterView.y + 8 - 62;
            this.sp_tips.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.sp_white.graphics.drawRect(0, 0, this.width, this.height, "#ffffff");
            //操作提示文字
            this.label_op1.text = def.getLanguageStr(def.LanguageConfig.Keys.OPERATE);
            this.label_opRight.text = def.getLanguageStr(def.LanguageConfig.Keys.JUMPSMALL);
            this.label_opUp.text = def.getLanguageStr(def.LanguageConfig.Keys.JUMPUP);
            this.label_opEasy.text = def.getLanguageStr(def.LanguageConfig.Keys.EASY);
            this.label_opClick.text = def.getLanguageStr(def.LanguageConfig.Keys.CLICK_BEGIN);
            this.box_tips.on(Laya.Event.CLICK, this, function () {
                _this.box_labels.visible = false;
                _this.box_tips.visible = false;
                _this.label_jump.visible = true;
                _this.label_jump.ani_play.play(0, true);
            });
            this.label_jump = new ui.comp.LabelScaleAniUI;
            this.label_jump.label_s.text = def.getLanguageStr(def.LanguageConfig.Keys.JUMP);
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
            this.addChild(this.frog);
            // this.sp_map.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.label_score.text = def.getLanguageStr(def.LanguageConfig.Keys.SCORE1) + this.score;
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
            var item = {
                tag: this.pillarShowArray[this.pillarIndex],
                pillar: null
            };
            if (this.pillarShowArray[this.pillarIndex] == 2) { //无柱子
                this.haveNullBefore = true;
            }
            else {
                this.haveNullBefore = false;
                var haveTrap = this.pillarShowArray[this.pillarIndex] == 3;
                var pillar = Laya.Pool.getItemByClass(game.Pillar.PILLARTAG, game.Pillar);
                var haveCoin = false;
                var isLucky = false;
                var haveDoor = false;
                if (this.roadArray.length > 8 && !haveTrap) {
                    var rate = Math.random();
                    if (!this.frog.inFly && !this.frog.inDoor && this.pillarShowArray[this.pillarIndex] != 4) {
                        if (rate > 0.95) { //0.9
                            haveDoor = true;
                        }
                        else if (rate > 0.88) {
                            isLucky = true;
                        }
                        else if (rate > 0.5) {
                            haveCoin = true;
                        }
                    }
                    else if (rate > 0.5) {
                        haveCoin = true;
                    }
                }
                pillar.init(this.lastXpos, this.pillarYPos, haveCoin, isLucky, haveDoor, haveTrap);
                this.sp_map.addChild(pillar);
                this.pillarArray.push(pillar);
                item.pillar = pillar;
            }
            this.roadArray.push(item);
            this.pillarIndex++;
        };
        GameMainView.prototype.playSelf = function () {
            if (!this.play_self) {
                return;
            }
            if (this.frog.inJump || this.frog.falling) { //未落地，操作无效
                return;
            }
            if (this.frog.x < this.width / 3) {
                var nowItem = this.roadArray[this.roadIndex];
                if (nowItem.tag == 4) {
                    this.jumpBig();
                    return;
                }
                var item = this.roadArray[this.roadIndex + 1];
                if (item == null) {
                    return;
                }
                //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
                if (item.tag == 1 || item.tag == 4) {
                    this.jumpSmall();
                }
                else {
                    this.jumpBig();
                }
            }
        };
        //游戏循环
        GameMainView.prototype.onLoop = function () {
            //布景移动
            this.waterView.run(this.gameSpeed + 0.1);
            this.stoneView.run(this.gameSpeed);
            this.buildingView.run(this.gameSpeed - 1);
            this.cloudsView.run(this.gameSpeed - 2);
            this.bgView.run(this.gameSpeed - 1.5);
            this.playSelf();
            //刷新柱子
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
                if (lastXpos <= Laya.stage.width + 300) {
                    this.addPillar();
                }
            }
            if (this.frog.inFly) { //飞行中
                //调整到合适位置
                if (Math.abs(this.frog.x - Math.floor(Laya.stage.width * 0.6) - def.GameConfig.SMALLSTEP) < 3) {
                    this.frog.x = Math.floor(Laya.stage.width * 0.6) - def.GameConfig.SMALLSTEP;
                }
                if (this.frog.x < Math.floor(Laya.stage.width * 0.6) - def.GameConfig.SMALLSTEP) {
                    this.frog.x += 2;
                }
                else if (this.frog.x > Math.floor(Laya.stage.width * 0.6) - def.GameConfig.SMALLSTEP) {
                    this.frog.x -= 2;
                }
                if (this.frog.waitLand) {
                    var itemN = this.roadArray[this.roadIndex + 2];
                    if (itemN.tag == 1 || itemN.tag == 4) {
                        if (itemN.pillar.x < this.frog.x + def.GameConfig.BIGSTEP) {
                            this.frogLand();
                            return;
                        }
                    }
                }
                //柱子路径
                var item = this.roadArray[this.roadIndex];
                if (item.tag == 2) {
                    this.roadIndex++;
                }
                else if (item.pillar.x < this.frog.x) {
                    this.roadIndex++;
                }
            }
            else if (this.frog.inDoor) { //传送门中
                if (this.frog.waitLand) {
                    var item_1 = this.roadArray[this.roadIndex];
                    //任意门挂掉
                    if (this.frog.doorDie) {
                        if (item_1.tag == 3) {
                            if (item_1.pillar.x < this.frog.x) {
                                this.outDoor(item_1);
                                return;
                            }
                        }
                    }
                    else {
                        if (item_1.tag == 1 || item_1.tag == 4) {
                            if (item_1.pillar.x < this.frog.x) {
                                this.outDoor(item_1);
                                return;
                            }
                        }
                    }
                }
                //柱子路径
                var item = this.roadArray[this.roadIndex];
                if (item.tag == 2) {
                    this.roadIndex++;
                }
                else if (item.pillar.x < this.frog.x) {
                    this.roadIndex++;
                }
            }
            else { //正常情况
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
                        this.frog.playBlastSound();
                    }
                }
            }
        };
        //青蛙动作结束
        GameMainView.prototype.frogActionOver = function (eventName) {
            var _this = this;
            if (this.gameStatus == 2) { //游戏结束
                return;
            }
            if (eventName == game.FrogJumpView.EVENT_STOP) {
                if (this.gameStatus != 1) {
                    this.start();
                }
                var item = this.roadArray[this.roadIndex];
                if (item.pillar.haveCoin) { //金币
                    item.pillar.hideProp();
                    this.frog.getCoin();
                    this.setScore();
                }
                if (item.pillar.isLucky) { //道具
                    item.pillar.hideProp();
                    this.getLucky();
                }
                if (item.pillar.haveDoor) { //门
                    item.pillar.closeDoor();
                    this.getDoor();
                }
                if (item.tag == 4) {
                    var posY = this.pillarYPos;
                    Tween.to(item.pillar, { y: posY + 100 }, 200);
                    Tween.to(this.frog, { y: posY + 100 }, 200, null, laya.utils.Handler.create(this, function () {
                        _this.frog.falling = false;
                    }));
                }
            }
            else if (eventName == game.FrogJumpView.EVENT_DIE) {
                this.frog.visible = false;
                this.gameOver();
            }
            else if (eventName == game.FrogJumpView.EVENT_FLYEND) {
                this.roadIndex += 2;
                var item = this.roadArray[this.roadIndex];
                this.frog.playAction(game.FrogJumpView.ACTIONS.stand, 0, item.pillar.x);
            }
        };
        GameMainView.prototype.beginWaterAction = function () {
            if (this.gameStatus != 1) {
                return;
            }
            var posY = Laya.stage.height - this.waterView.picHeight;
            Tween.clearTween(this.beginWaterAction);
            Tween.to(this.waterView, { y: posY + 5 }, 500, null, Handler.create(this, this.onTween1));
        };
        GameMainView.prototype.onTween1 = function () {
            if (this.gameStatus != 1) {
                return;
            }
            var posY = Laya.stage.height - this.waterView.picHeight;
            Tween.clearTween(this.onTween1);
            Tween.to(this.waterView, { y: posY }, 500, null, Handler.create(this, this.beginWaterAction));
        };
        //吃到道具
        GameMainView.prototype.getLucky = function () {
            this.propTime = 10;
            var nowItem = this.roadArray[this.roadIndex];
            if (nowItem.tag == 4) { //掉下去的柱子
                Laya.timer.loop(200, this, this.seatCoffee);
                return;
            }
            var rate = Math.random();
            if (rate < 0.3) { //coffee
                Laya.timer.loop(200, this, this.seatCoffee);
            }
            else if (rate < 0.6) { //superman
                this.flySuperman();
            }
            else { //rocket
                this.flyRocket();
            }
        };
        //原地喝coffee
        GameMainView.prototype.seatCoffee = function () {
            this.frog.playAction(game.FrogJumpView.ACTIONS.seat_coffee);
            Laya.timer.clear(this, this.onLoop);
            this.propTime--;
            this.frog.getCoin();
            this.setScore();
            if (this.propTime < 1) {
                var nowItem = this.roadArray[this.roadIndex];
                this.frog.playAction(game.FrogJumpView.ACTIONS.stand, nowItem.pillar.y);
                Laya.timer.clear(this, this.seatCoffee);
                this.continue();
            }
        };
        //fly
        GameMainView.prototype.flySuperman = function () {
            this.frog.playAction(Frog.ACTIONS.jump_to_fly);
            this.gameSpeedNormal = this.gameSpeed;
            this.gameSpeed = 16;
            Laya.timer.loop(300, this, this.flyScore);
        };
        //rocket
        GameMainView.prototype.flyRocket = function () {
            this.frog.playAction(Frog.ACTIONS.jump_to_rocket);
            this.gameSpeedNormal = this.gameSpeed;
            this.gameSpeed = 16;
            Laya.timer.loop(300, this, this.flyScore);
        };
        //飞行分数
        GameMainView.prototype.flyScore = function () {
            this.frog.getCoin(true);
            this.setScore();
            this.propTime--;
            if (this.propTime < 1 && !this.frog.waitLand) {
                this.frog.waitLand = true; //等落地
            }
        };
        GameMainView.prototype.frogLand = function () {
            this.frog.inFly = false;
            this.frog.waitLand = false;
            Laya.timer.clear(this, this.flyScore);
            this.gameSpeed = this.gameSpeedNormal; //恢复游戏速度
            this.frog.playAction(Frog.ACTIONS.fly_to_land);
        };
        //进入任意门
        GameMainView.prototype.getDoor = function () {
            this.frog.visible = false;
            this.frog.x = Math.floor(Laya.stage.width * 0.6) - 250;
            this.frog.inDoor = true;
            this.propTime = 10;
            this.gameSpeedNormal = this.gameSpeed;
            this.gameSpeed = 8; //16;
            Laya.timer.loop(300, this, this.doorScore);
        };
        //任意门分数
        GameMainView.prototype.doorScore = function () {
            this.frog.getCoin(true);
            this.setScore();
            this.propTime--;
            if (this.propTime < 1 && !this.frog.waitLand) {
                this.frog.waitLand = true; //等落地
                if (Math.random() < 0.3) { //等死
                    this.frog.doorDie = true;
                }
            }
        };
        //从门里出来
        GameMainView.prototype.outDoor = function (item) {
            var _this = this;
            this.frog.inDoor = false;
            this.frog.waitLand = false;
            this.frog.doorDie = false;
            Laya.timer.clearAll(this);
            item.pillar.openDoor();
            item.pillar.on(item.pillar.EVENT_DOOR_OPEN, this, function () {
                _this.gameSpeed = _this.gameSpeedNormal; //恢复游戏速度
                _this.frog.visible = true;
                _this.frog.x = item.pillar.x;
                Laya.timer.frameLoop(1, _this, _this.onLoop);
                if (item.pillar.haveCoin) {
                    item.pillar.hideProp();
                    _this.frog.getCoin();
                    _this.setScore();
                }
                if (item.tag == 4) {
                    _this.frog.falling = true;
                    var posY = _this.pillarYPos;
                    Tween.to(item.pillar, { y: posY + 100 }, 200);
                    Tween.to(_this.frog, { y: posY + 100 }, 200, null, laya.utils.Handler.create(_this, function () {
                        _this.frog.falling = false;
                    }));
                }
                else if (item.tag == 3) {
                    _this.frog.playAction(Frog.ACTIONS.stand_blast);
                }
                console.log("end......", _this.roadIndex);
            });
        };
        return GameMainView;
    }(ui.game.GameMainUI));
    game.GameMainView = GameMainView;
})(game || (game = {}));
//# sourceMappingURL=GameMainView.js.map