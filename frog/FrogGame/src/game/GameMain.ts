
//游戏主界面
namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import AdView = ad.AdView;


    export class GameMain extends ui.game.GameMainUI {
        BEGINXPOS = 30; //开始位置
        COUNTDOWNNUM = 3;   //倒计时时间

        frog: Frog;             //青蛙
        gameStatus = 0;         //游戏状态 0--暂停中，1--进行中
        lastXpos;               //柱子位置记录
        pillarArray = [];       //柱子对象
        lastStepBig: boolean = true;    //上一次间隔是大间隔
        lastHaveTrap: boolean = false;   //上次有陷阱

        pillarYPos;

        gameMode;   //游戏模式
        /**
         * @param gameMode 游戏模式
         */
        constructor(gameMode) {
            super();
            this.pillarYPos = Laya.stage.height * 3 / 5;
            this.size(Laya.stage.width, Laya.stage.height);
            // console.log("stage....width....", this.width, this.height);
            this.gameMode = gameMode;
            this.label_control.on(Event.CLICK, this, this.gameControl);
            this.init();
            this.start();
        }
        ////////////////界面操作///////////////
        //游戏控制
        gameControl() {
            if (this.gameStatus == 0) {
                this.pause();
            } else {
                this.continue();
            }
        }
        //开始
        start() {
            this.gameStatus = 1;
            let countDown = this.COUNTDOWNNUM;
            this.label_time.changeText(countDown + "");
            this.label_time.visible = true;
            Laya.timer.loop(1000, this, () => {  //倒计时
                if (countDown < 0) {
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
            for (let i = 0; i < this.pillarArray.length; i++) {
                this.pillarArray[i].removeSelf();
                Laya.Pool.recover(Pillar.PILLARTAG, this.pillarArray[i]);
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
            if (!this.frog) {
                this.frog = new Frog;
                this.frog.on(this.frog.ACTIONEND, this, this.frogActionOver);
            }

            this.lastXpos = this.BEGINXPOS;

            this.frog.pos(this.lastXpos, this.pillarYPos);
            this.frog.playAnimation(Frog.ACTIONS.stand);
            this.gameMap.addChild(this.frog);

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
            this.frog.x -= GameConfig.SPEED - this.frog.speedX;
            this.frog.y += this.frog.speedY;

            if (this.frog.x - this.frog.width / 2 < 0) { //撞墙
                this.frogBlast();
                return;
            }
            if (this.pillarArray.length) {
                for (let i = this.pillarArray.length - 1; i > -1; i--) {
                    this.pillarArray[i].x -= GameConfig.SPEED;
                    if (this.pillarArray[i].x < -GameConfig.PILLARWIDTH / 2) {
                        //回收
                        Laya.Pool.recover(Pillar.PILLARTAG, this.pillarArray[i]);
                        this.pillarArray.shift();
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
            this.pause();
            this.frog.playAnimation(Frog.ACTIONS.blast);
        }
        //青蛙动作结束
        frogActionOver(actionName) {
            console.log("监听动画结束。。。。。");
            if (actionName == Frog.ACTIONS.stand) {          //静止

            } else if (actionName == Frog.ACTIONS.flyUp) {   //起跳

            } else if (actionName == Frog.ACTIONS.jump) {        //起飞

            } else if (actionName == Frog.ACTIONS.upToDown) {        //上升变下降

            } else if (actionName == Frog.ACTIONS.flyDown) {  //下降

            } else if (actionName == Frog.ACTIONS.landing) {  //落地

            } else if (actionName == Frog.ACTIONS.blast) {  //爆炸
                console.log("爆炸后。。。。。");
                this.gameOver();
            }
        }
    }
}