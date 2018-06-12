
//游戏主界面
namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import Frog = game.Frog;
    import ButtonGo = kelong.ui.KButtonGO;

    export class GameMainView extends ui.game.GameMainUI {
        BEGINXPOS = 180; //开始位置
        COUNTDOWNNUM = 3;   //倒计时时间

        frog: Frog;             //青蛙
        gameStatus = 0;         //游戏状态 0--暂停中，1--进行中
        lastXpos;               //柱子位置记录
        pillarArray = [];       //柱子对象
        lastStepBig: boolean = true;    //上一次间隔是大间隔
        lastHaveTrap: boolean = false;   //上次有陷阱
        score: number = 0; //分数
        stepBig: boolean = false;   //跳跃是否为大跳
        pillarShowArray;    //柱子展示数组
        pillarArrayIndex;   //柱子展示数组下标
        pillarIndex;        //柱子下标
        haveNullBefore;      //前边有空柱子
        speedAddTag = 0;        //游戏速度加速次数标记
        gameSpeed;  //游戏速度

        pillarYPos;
        //场景
        //云层
        // cloudsView: CloudsView;
        //远景
        farView: FarView;
        //水
        waterView: WaterView;

        buttonGo: ButtonGo;

        gameMode;   //游戏模式
        /**
         * @param gameMode 游戏模式
         */
        constructor(gameMode) {
            super();
            this.pillarYPos = Laya.stage.height - 587;// * 2 / 5;
            this.size(Laya.stage.width, Laya.stage.height);
            this.gameMode = gameMode;            
            this.init();
            // this.start();
            this.img_bg.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.img_bg.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            // this.label_control.on("click", this, this.gameControl);
            // this.on(Event.RESIZE, this, () => {
            //     this.graphics.drawRect(0,0, this.width, this.height, this.color);
            // });
        }
        ////////////////界面操作///////////////
        mousePos = { time: 0, x: 0, y: 0 };
        //鼠标按下
        onMouseDown() {
            this.mousePos.x = this.mouseX;
            this.mousePos.y = this.mouseY;
            this.mousePos.time = new Date().valueOf();
        }
        //鼠标弹起
        onMouseUp() {
            if (this.gameStatus != 1) { //游戏进行中
                // console.log("未进行，操作无效");
                return;
            }
            if (this.frog.inJump) {  //未落地，操作无效
                // console.log("未落地，操作无效");
                return;
            }
            let endTime = new Date().valueOf();
            if (endTime - this.mousePos.time > 1200) {  //操作时间过长，认为操作无效
                return;
            }
            let difX = this.mouseX - this.mousePos.x;
            let difY = this.mouseY - this.mousePos.y;
            let angle = Math.atan2(difY, difX);
            // console.log("xxxxxxxxxxxxxxxxx...鼠标操作........", difX, difY, angle);
            if (angle < Math.PI / 6 && angle > 0 || angle >= -Math.PI / 6 && angle < 0) {     //右滑
                if (difX < 100) {
                    return;
                }
                this.stepBig = false;
                this.frog.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) { //上滑动
                if (difY > -100) {
                    return;
                }
                this.stepBig = true;
                this.frog.jumbBig();
            }
        }
        //游戏控制
        // gameControl() {
        //     console.log("control...........", this.gameStatus);
        //     if (this.gameStatus == 1) {
        //         this.label_control.changeText("继续");
        //         this.pause();
        //     } else {
        //         this.label_control.changeText("暂停");
        //         this.continue();
        //     }
        // }
        //开始
        start() {
            this.gameStatus = 1;
            Laya.timer.frameLoop(1, this, this.onLoop);
        }
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
        pause() {
            this.gameStatus = 0;
            Laya.timer.clearAll(this);
        }

        //继续
        continue() {
            this.gameStatus = 1;
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        //游戏结束
        gameOver() {
            this.label_score.text  = "";
            let oView = new GameOverView(this.score);
            oView.zOrder = 100;
            this.addChild(oView);
            //再来一把
            oView.on(oView.AGIN, this, () => {
                this.score = 0;
                this.playAgin();
                this.box_tips.visible = true;
            });
            //继续
            oView.on(oView.ADEND, this, () => {
                this.playAgin();
                this.box_tips.visible = true;
            });
        }

        //再来一局
        playAgin() {
            this.clearGame();
            this.initGoods();
        }

        //清理游戏
        clearGame() {
            //回收柱子
            for (let i = this.pillarArray.length - 1; i > -1; i--) {
                this.pillarArray[i].removeSelf();
                Laya.Pool.recover(Pillar.PILLARTAG, this.pillarArray[i]);
                this.pillarArray.pop();
            }
        }

        //退出
        quit() {
            Laya.timer.clearAll(this);
            this.frog.destroy();
            Laya.Pool.clearBySign(Pillar.PILLARTAG);
            this.destroy();
            // utl.comeToLobby();
            let lobbyMian = new lobby.LobbyMainView;
            Laya.stage.addChild(lobbyMian);
            this.destroy();
        }
        ///////////游戏逻辑/////////////////
        //游戏初始化
        init() {
            this.sp_tips.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.sp_white.graphics.drawRect(0, 0, this.width, this.height, "#ffffff");

            this.buttonGo = new ButtonGo("GO");
            this.buttonGo.centerX = 0;
            this.buttonGo.centerY = -80;
            this.buttonGo.visible = false;
            this.buttonGo.on(Laya.Event.CLICK, this, () => {
                this.ani_go.play(0, false);
                this.buttonGo.visible = false;
            });
            this.box_tips.addChild(this.buttonGo);

            this.box_tips.on(Laya.Event.CLICK, this, () => {
                this.box_labels.visible = false;
                this.buttonGo.visible = true;
            });

            this.ani_go.on(Laya.Event.COMPLETE, this, () => {
                this.box_tips.visible = false;
                this.start();
            });

            //云层
            // this.cloudsView = new CloudsView;
            // this.sp_map.addChild(this.cloudsView);
            //远景
            this.farView = new FarView;
            this.sp_map.addChild(this.farView);
            //水
            this.waterView = new WaterView;
            this.waterView.y = Laya.stage.height - this.waterView.picHeight;
            this.waterView.zOrder = this.sp_map.zOrder + 1;
            this.box_tips.zOrder = this.waterView.zOrder + 1;
            this.addChild(this.waterView);
            this.farView.y = this.waterView.y - 209;

            this.initGoods();
        }

        initGoods() {
            if (this.frog) {
                this.frog.destroy();
            }
            this.frog = new Frog;
            this.frog.on(this.frog.ACTIONEND, this, this.frogActionOver);
            this.sp_map.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.label_score.changeText("分数：" + this.score);
            this.gameSpeed = GameConfig.SPEED;
            this.frog.initPos(this.lastXpos, this.pillarYPos);
            this.frog.playAnimation(Frog.ACTIONS.stand);
            this.frog.speedX = 0;
            this.lastHaveTrap = false;
            this.pillarShowArray = (Pillar.getPillarShowArray(true)).array;
            this.pillarIndex = 0;
            this.addPillar(this.lastXpos);
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
        }

        //增加柱子
        addPillar(xPos?) {
            if (!xPos) {
                this.lastXpos = this.haveNullBefore ? this.pillarArray[this.pillarArray.length - 1].x + GameConfig.SMALLSTEP * 2 : this.pillarArray[this.pillarArray.length - 1].x + GameConfig.SMALLSTEP;
            }
            if (this.pillarIndex == this.pillarShowArray.length) {
                let ret = Pillar.getPillarShowArray(false, this.pillarArrayIndex);
                this.pillarShowArray = ret.array;
                this.pillarArrayIndex = ret.idx;
                this.pillarIndex = 0;
            }
            if (this.pillarShowArray[this.pillarIndex] == 2) {   //无柱子
                this.haveNullBefore = true;
            } else {
                this.haveNullBefore = false;
                let haveTrap = this.pillarShowArray[this.pillarIndex] == 3;
                let pillar: Pillar = Laya.Pool.getItemByClass(Pillar.PILLARTAG, Pillar);
                pillar.init(this.lastXpos, this.pillarYPos, haveTrap);
                pillar.zOrder = 1;
                this.sp_map.addChild(pillar);
                this.pillarArray.push(pillar);
            }
            this.pillarIndex++;
        }

        //游戏循环
        onLoop() {
            if (this.frog.inJump) {
                this.frog.setSpeed();
                this.frog.y -= this.frog.speedY;
            }
            // this.cloudsView.run(this.gameSpeed);
            this.farView.run(this.gameSpeed - 1.5);
            this.waterView.run(this.gameSpeed);
            let fSpeed = this.gameSpeed - this.frog.speedX;
            this.frog.x -= fSpeed;
            if (this.frog.x - this.frog.width / 2 < 0 || this.frog.x + this.frog.width / 2 >= Laya.stage.width) { //撞墙
                this.frogBlast();
                return;
            }
            if (this.pillarArray.length) {
                for (let i = this.pillarArray.length - 1; i > -1; i--) {
                    let p = this.pillarArray[i];
                    p.x -= this.gameSpeed;
                    if (this.pillarArray[i].x < -GameConfig.PILLARWIDTH / 2) {
                        //回收
                        Laya.Pool.recover(Pillar.PILLARTAG, p);
                        this.pillarArray.shift();
                    }
                    //青蛙与柱子的碰撞 
                    if (this.frog.inJump) {
                        if (this.frog.y >= this.pillarYPos && this.frog.x > p.x - p.width / 2 - this.frog.width / 2 && this.frog.x < p.x + p.width / 2) {   //等于或低于柱子
                            if (Math.abs(this.frog.x - p.x) < p.width / 2) {    //落到柱子上了
                                if (p.haveTrap) {    //扎刺了
                                    this.frogBlast();
                                } else {
                                    this.frog.x = p.x; //要漏一帧的速度
                                    this.score += 1; //this.stepBig ? 2 : 1;
                                    this.label_score.changeText("分数：" + this.score);
                                    this.frog.playAnimation(Frog.ACTIONS.landing);
                                    if (this.score > 10 && this.speedAddTag < 1) {   //第一次加速
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 30 && this.speedAddTag < 2) { //第三次加速
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 50 && this.speedAddTag < 3) { //第四次加速
                                        this.gameSpeed += 2;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 80 && this.speedAddTag < 4) { //第五次加速
                                        this.gameSpeed += 2;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 100 && this.speedAddTag < 5) { //第六次加速
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 120 && this.speedAddTag < 6) { //第七次加速
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 150 && this.speedAddTag < 7) { //第八次加速
                                        this.gameSpeed += 1;
                                        this.speedAddTag++;
                                    }
                                    if (this.score > 200 && this.speedAddTag < 8) { //第九次加速
                                        this.gameSpeed += 2;
                                        this.speedAddTag++;
                                    }
                                }
                            } else if (this.frog.y + this.frog.width / 2 >= this.pillarArray[i].x - this.pillarArray[i].width / 2) {       //撞到柱子上了
                                this.frogBlast();
                            }
                        }
                    }
                }
                let lastXpos = this.pillarArray[this.pillarArray.length - 1].x;
                if (lastXpos <= Laya.stage.width) {
                    this.addPillar();
                }
            }
        }
        //青蛙爆炸
        frogBlast() {
            this.pause();
            this.frog.playAnimation(Frog.ACTIONS.blast);
        }
        //青蛙动作结束
        frogActionOver(actionName) {
            if (actionName == Frog.ACTIONS.stand) {          //静止

            } else if (actionName == Frog.ACTIONS.flyUp) {   //起跳

            } else if (actionName == Frog.ACTIONS.jump) {        //起飞

            } else if (actionName == Frog.ACTIONS.upToDown) {        //上升变下降

            } else if (actionName == Frog.ACTIONS.flyDown) {  //下降

            } else if (actionName == Frog.ACTIONS.landing) {  //落地

            } else if (actionName == Frog.ACTIONS.blast) {  //爆炸
                this.frog.visible = false;
                this.gameOver();
            }
        }
    }
}