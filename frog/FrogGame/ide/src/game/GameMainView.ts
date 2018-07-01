
//游戏主界面
namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import Frog = game.FrogJumpView;
    import ButtonGo = kelong.ui.KButtonGO;

    export class GameMainView extends ui.game.GameMainUI {
        BEGINXPOS = 180; //开始位置
        COUNTDOWNNUM = 3;   //倒计时时间

        frog: Frog;             //青蛙
        roadIndex = 0;  //青蛙再路上位置
        roadArray = [];  //0-没有柱子，1-正常柱子，2-有刺柱子
        jumpToBlast: boolean = false; //要爆
        havePlayBlast: boolean = false;

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
        //背景
        bgView: RepeatImageView;
        //远景
        buildingView: RepeatImageView;
        //云层
        // cloudsView: CloudsView;
        //水
        waterView: WaterView;
        label_jump:ui.comp.LabelScaleAniUI;

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
            this.box_control.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.box_control.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
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
            // if (this.gameStatus != 1) { //游戏进行中
            //     // console.log("未进行，操作无效");
            //     return;
            // }
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
            if (angle < Math.PI / 6 && angle > 0 || angle >= -Math.PI / 6 && angle < 0) {     //右滑
                if (difX < 100) {
                    return;
                }
                if(this.gameStatus != 1) {
                    this.start();
                }
                this.stepBig = false;
                this.score++;
                this.gameSpeed += 0.04;
                this.label_score.text = "分数：" + this.score;
                this.jumpSmall();
            }
            if (angle < -Math.PI / 3 && angle > -Math.PI * 2 / 3) { //上滑动
                if (difY > -100) {
                    return;
                }
                if(this.gameStatus != 1) {
                    this.start();
                }
                this.stepBig = true;
                this.jumbBig();
                this.score++;
                this.gameSpeed += 0.04;
                this.label_score.text = "分数：" + this.score;
            }
        }

        jumpSmall() {
            this.roadIndex += 1
            //0-没有柱子，1-正常柱子，2-有刺柱子
            if (this.roadArray[this.roadIndex] == 0) {
                this.jumpToBlast = true;
                this.frog.playAction(FrogJumpView.ACTIONS.jump_small_fall);
            } else if (this.roadArray[this.roadIndex] == 1) {
                this.frog.playAction(FrogJumpView.ACTIONS.jump_small);
            } else {
                this.jumpToBlast = true;
                this.frog.playAction(FrogJumpView.ACTIONS.jump_small_blast);
            }
        }

        jumbBig() {
            this.roadIndex += 2
            //0-没有柱子，1-正常柱子，2-有刺柱子
            if (this.roadArray[this.roadIndex] == 0) {
                this.jumpToBlast = true;
                this.frog.playAction(FrogJumpView.ACTIONS.jump_big_fall);
            } else if (this.roadArray[this.roadIndex] == 1) {
                this.frog.playAction(FrogJumpView.ACTIONS.jump_big);
            } else {
                this.jumpToBlast = true;
                this.frog.playAction(FrogJumpView.ACTIONS.jump_big_blast);
            }
        }

        //开始
        start() {
            this.gameStatus = 1;
            // this.visible = true;
            // this.label_jump.pos(this.frog.x , this.frog.y - 50);
            utl.MusicSoundTool.playMusic(def.MusicConfig.CommonMusic.game_bg);
            this.label_jump.visible = false;
            this.label_jump.ani_play.stop();
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        //暂停
        pause() {
            utl.MusicSoundTool.stopMusic();
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
            this.pause();
            this.label_score.text = "";
            let oView = new GameOverView(this.score);
            oView.zOrder = 100;
            this.addChild(oView);
            //再来一把
            oView.on(oView.AGIN, this, () => {
                this.score = 0;
                this.playAgin();
            });
            //继续
            oView.on(oView.ADEND, this, () => {
                this.playAgin();
            });
        }

        //再来一局
        playAgin() {
            this.clearGame();
            this.initGoods();
            this.label_jump.ani_play.play(0, true);
            this.label_jump.visible = true;
        }

        //清理游戏
        clearGame() {
            this.jumpToBlast = false; //要爆
            this.havePlayBlast = false;
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
            // let lobbyMian = new lobby.LobbyMainView;
            // Laya.stage.addChild(lobbyMian);
            this.destroy();
        }
        ///////////游戏逻辑/////////////////
        //游戏初始化
        init() {
            this.graphics.drawRect(0, 0, this.width, this.height, "#3584fb");
            //滚动背景
            this.bgView = new RepeatImageView("frog/bg.png");
            this.bgView.pos(0, this.height - this.bgView.contentHeight);
            this.bgView.zOrder = -99;
            this.addChild(this.bgView);
            //建筑景物
            this.buildingView = new RepeatImageView("frog/yuanjingcen.png");
            this.sp_map.addChild(this.buildingView);
            //水
            this.waterView = new WaterView;
            this.waterView.y = Laya.stage.height - this.waterView.picHeight;
            this.waterView.zOrder = this.sp_map.zOrder + 1;
            this.box_tips.zOrder = this.waterView.zOrder + 1;
            this.addChild(this.waterView);
            this.buildingView.y = this.waterView.y - 209;

            this.sp_tips.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.sp_white.graphics.drawRect(0, 0, this.width, this.height, "#ffffff");

            this.box_tips.on(Laya.Event.CLICK, this, () => {
                this.box_labels.visible = false;
                this.box_tips.visible = false;
                this.label_jump.visible = true;
                this.label_jump.ani_play.play(0, true);
            });

            this.label_jump = new ui.comp.LabelScaleAniUI;
            this.sp_map.addChild(this.label_jump);
            this.label_jump.visible = false;
            
            this.initGoods();
        }

        initGoods() {
            if (this.frog) {
                this.frog.destroy();
            }
            this.frog = new Frog;
            this.roadIndex = 0;
            this.roadArray = [];
            this.frog.on(FrogJumpView.ACTIONEND, this, this.frogActionOver);
            this.sp_map.addChild(this.frog);
            this.lastXpos = this.BEGINXPOS;
            this.label_score.text = "分数：" + this.score;
            this.gameSpeed = GameConfig.SPEED;
            this.frog.initPos(this.lastXpos, this.pillarYPos);
            this.frog.playAction(FrogJumpView.ACTIONS.stand);
            this.lastHaveTrap = false;
            this.pillarShowArray = (Pillar.getPillarShowArray(true)).array;
            this.pillarIndex = 0;
            this.addPillar(this.lastXpos);
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
            this.label_jump.pos(this.frog.x - this.label_jump.width/2, this.frog.y - 80);
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
                this.roadArray.push(0);
            } else {
                this.haveNullBefore = false;
                let haveTrap = this.pillarShowArray[this.pillarIndex] == 3;
                let pillar: Pillar = Laya.Pool.getItemByClass(Pillar.PILLARTAG, Pillar);
                pillar.init(this.lastXpos, this.pillarYPos, haveTrap);
                pillar.zOrder = 1;
                this.sp_map.addChild(pillar);
                this.pillarArray.push(pillar);
                if (haveTrap) {
                    this.roadArray.push(2);
                } else {
                    this.roadArray.push(1);
                }
            }
            this.pillarIndex++;
        }

        //游戏循环
        onLoop() {
            //布景移动
            this.waterView.run(this.gameSpeed + 0.1);
            this.buildingView.run(this.gameSpeed - 1);
            this.bgView.run(this.gameSpeed - 1.5);

            this.frog.x -= this.gameSpeed;

            let frogX = this.frog.getRealPosX();
            //青蛙与墙壁碰撞
            if (frogX <= 0 || frogX > this.width) {
                if (frogX <= 0) {
                    frogX = + 27;
                } else {
                    frogX = this.width - 27;
                }
                let frogY = this.frog.getRealPosY();
                this.pause();
                this.frog.initPos(frogX, frogY);
                this.frog.playAction(FrogJumpView.ACTIONS.stand_blast);
            }
            //要爆
            if (this.jumpToBlast) {
                let frogY = this.frog.getRealPosY();
                if (frogY <= this.pillarYPos - 4 && !this.havePlayBlast) {
                    this.havePlayBlast = true;
                    utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.blast);
                }
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
                }
                let lastXpos = this.pillarArray[this.pillarArray.length - 1].x;
                if (lastXpos <= Laya.stage.width) {
                    this.addPillar();
                }
            }
        }
        //青蛙动作结束
        frogActionOver(eventName) {
            if (eventName == FrogJumpView.EVENT_STOP) {

            } else if (eventName == FrogJumpView.EVENT_DIE) {
                this.frog.visible = false;
                this.gameOver();
            }
        }
    }
}