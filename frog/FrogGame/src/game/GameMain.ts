
//游戏主界面
namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import AdView = ad.AdView;


    export class GameMain extends ui.game.GameMainUI {
        BEGINXPOS = 150; //开始位置
        COUNTDOWNNUM = 3;   //倒计时时间

        frog: Frog;             //青蛙
        gameStatus = 0;         //游戏状态 0--暂停中，1--进行中
        lastXpos;               //柱子位置记录
        pillarArray = [];       //柱子对象
        lastStepBig: boolean = true;    //上一次间隔是大间隔
        lastHaveTrap: boolean = false;   //上次有陷阱
        score: number = 0; //分数

        pillarYPos;

        gameMode;   //游戏模式
        /**
         * @param gameMode 游戏模式
         */
        constructor(gameMode) {
            super();
            this.pillarYPos = Laya.stage.height * 3 / 5;
            this.size(Laya.stage.width, Laya.stage.height);
            this.gameMode = gameMode;
            this.init();
            this.start();
            this.img_bg.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.img_bg.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.label_control.on("click", this, this.gameControl);
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
                console.log("未进行，操作无效");
                return;
            }
            if (this.frog.inJump) {  //未落地，操作无效
                console.log("未落地，操作无效");
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
                this.frog.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) { //上滑动
                if (difY > -100) {
                    return;
                }
                this.frog.jumbBig();
            }
        }
        //游戏控制
        gameControl() {
            console.log("control...........", this.gameStatus);
            if (this.gameStatus == 1) {
                this.label_control.changeText("继续");
                this.pause();
            } else {
                this.label_control.changeText("暂停");
                this.continue();
            }
        }
        //开始
        start() {
            let countDown = this.COUNTDOWNNUM;
            this.label_time.changeText(countDown + "");
            this.label_time.visible = true;
            Laya.timer.loop(1000, this, () => {  //倒计时
                if (countDown < 0) {
                    this.gameStatus = 1;
                    this.label_time.visible = false;
                    Laya.timer.clearAll(this);
                    Laya.timer.frameLoop(1, this, this.onLoop);
                    this.label_control.visible = true;
                    return;
                }
                this.label_time.changeText(countDown + "");
                countDown--;
            });
        }

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
            let ad = new AdView();
            ad.on(ad.PLAYAGIN, this, () => {
                this.playAgin();
            });
            ad.on(ad.BACK, this, () => {
                this.quit();
            });
            Laya.stage.addChild(ad);
        }

        //再来一局
        playAgin() {
            this.clearGame();
            this.init();
            this.start();
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
            utl.comeToLobby();
        }
        ///////////游戏逻辑/////////////////
        //游戏初始化
        init() {
            if (this.frog) {
                this.frog.destroy();
            }
            this.frog = new Frog;
            this.frog.on(this.frog.ACTIONEND, this, this.frogActionOver);
            this.gameMap.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.score = 0;

            this.frog.initPos(this.lastXpos, this.pillarYPos);
            this.frog.playAnimation(Frog.ACTIONS.stand);
            this.frog.speedX = 0;
            this.lastHaveTrap = false;
            this.addPillar(this.lastXpos);
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
        }

        //增加柱子
        addPillar(xPos?) {
            if (xPos) {
                this.lastXpos = xPos;
            } else {
                let ran = Math.random();
                if (this.lastHaveTrap) {
                    this.lastXpos += GameConfig.SMALLSTEP;
                    this.lastStepBig = false;
                } else {
                    if (ran < 0.5) {  //间距频率
                        this.lastXpos += GameConfig.SMALLSTEP;
                        this.lastStepBig = false;
                    } else {
                        this.lastXpos += GameConfig.BIGSTEP;
                        this.lastStepBig = true;
                    }
                }
                if (!this.lastStepBig && !this.lastHaveTrap) { //陷阱频率
                    this.lastHaveTrap = Math.random() < 0.8 ? true : false;
                } else {
                    this.lastHaveTrap = false;
                }
            }
            let pillar: Pillar = Laya.Pool.getItemByClass(Pillar.PILLARTAG, Pillar);
            pillar.init(this.lastXpos, this.pillarYPos, this.lastHaveTrap);
            this.gameMap.addChild(pillar);
            this.pillarArray.push(pillar);
        }

        //游戏循环
        onLoop() {
            if (this.frog.inJump) {
                this.frog.setSpeed();
                this.frog.y -= this.frog.speedY;
            }
            let fSpeed = GameConfig.SPEED - this.frog.speedX;
            this.frog.x -= fSpeed;
            if (this.frog.x - this.frog.width / 2 < 0 || this.frog.x + this.frog.width / 2 >= Laya.stage.width) { //撞墙
                this.frogBlast();
                return;
            }
            if (this.pillarArray.length) {
                for (let i = this.pillarArray.length - 1; i > -1; i--) {
                    let p = this.pillarArray[i];
                    p.x -= GameConfig.SPEED;
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
                                    this.frog.x = p.x; //要漏以帧的速度
                                    this.score++;
                                    this.label_score.changeText("分数：" + this.score);
                                    this.frog.playAnimation(Frog.ACTIONS.landing);
                                }
                            } else if (this.frog.y + this.frog.width / 2 >= this.pillarArray[i].x - this.pillarArray[i].width / 2) {       //撞到柱子上了
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
        }
        //青蛙爆炸
        frogBlast() {
            console.log("死了.......");
            this.pause();
            this.frog.playAnimation(Frog.ACTIONS.blast);
        }
        //青蛙动作结束
        frogActionOver(actionName) {
            // console.log("监听动画结束。。。。。", actionName, Frog.ACTIONS.landing);
            if (actionName == Frog.ACTIONS.stand) {          //静止

            } else if (actionName == Frog.ACTIONS.flyUp) {   //起跳

            } else if (actionName == Frog.ACTIONS.jump) {        //起飞

            } else if (actionName == Frog.ACTIONS.upToDown) {        //上升变下降

            } else if (actionName == Frog.ACTIONS.flyDown) {  //下降

            } else if (actionName == Frog.ACTIONS.landing) {  //落地

            } else if (actionName == Frog.ACTIONS.blast) {  //爆炸
                this.gameOver();
            }
        }
    }
}