
namespace game {

    /**
     * 青蛙
     */
    import Sprite = Laya.Sprite;
    import GameConfig = def.GameConfig;

    export class Frog extends Laya.Sprite {
        //event
        ACTIONEND = "actionEnd";

        static ACTIONS = {
            stand: "stand",      //静止
            jump: "jump",        //起跳
            flyUp: "flyUp",      //起飞
            upToDown: "upToDown",//上升变下降
            flyDown: "flyDown",  //下降
            landing: "landing",  //落地
            blast: "blast",        //爆炸
        }

        private static cached: boolean = false;
        beginPos = { x: 0, y: 0 };       //开始的位置
        speedX: number = 0;      //速度X
        speedY: number = 0;      //速度Y
        acceleratedY: number = 0; //y上的加速度
        jumpHeight: number = 40;    //跳跃高度
        jumpTime: number = 0; //跳跃时间
        inJump: boolean = false;    //是否正在跳跃

        actionBody: Laya.Animation; //动作
        actionName; //动作名称
        constructor() {
            super();
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
            if (!this.actionBody) {
                this.actionBody = new Laya.Animation();
                this.actionBody.interval = 50;
                this.actionBody.scale(2, 2);
                this.addChild(this.actionBody);
                //增加动画播放完成监听
                this.actionBody.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
            }
        }

        //播放
        playAnimation(action) {
            this.actionName = action;
            this.actionBody.play(0, true, action);
            var bound: Laya.Rectangle = this.getBounds();
            this.size(bound.width, bound.height);
            this.pivot(bound.width / 2, bound.height);
            if (action == Frog.ACTIONS.jump) {  //起跳
                this.inJump = true;
            } else if (this.actionName == Frog.ACTIONS.blast) { //爆炸
                this.inJump = false;
            } else if (this.actionName == Frog.ACTIONS.landing) {  //落地
                this.inJump = false;
            }
            console.log("action.....", this.actionName);
        }

        //动画播放完成
        onPlayComplete() {
            console.log("播放动画完成......", this.actionName);
            let stop = false;
            if (this.actionName == Frog.ACTIONS.stand) {          //静止
                stop = true;
            } else if (this.actionName == Frog.ACTIONS.flyUp) {   //起跳

            } else if (this.actionName == Frog.ACTIONS.jump) {        //起飞
                stop = true;
            } else if (this.actionName == Frog.ACTIONS.upToDown) {        //上升变下降
                stop = true;
            } else if (this.actionName == Frog.ACTIONS.flyDown) {  //下降
                stop = true;
            } else if (this.actionName == Frog.ACTIONS.landing) {  //落地

            } else if (this.actionName == Frog.ACTIONS.blast) {  //爆炸
                stop = true;
            }
            this.event(this.ACTIONEND, this.actionName);
            if (stop) {
                this.actionBody.stop();
            }
        }

        //设置初始位置
        initPos(x, y) {
            this.pos(x, y);
            this.beginPos = { x: x, y: y };
        }
        //计算速度
        setSpeed() {
            if (this.inJump) {
                if (this.speedY < 0) {   //开始下降
                    this.speedY = 0;
                    this.playAnimation(Frog.ACTIONS.upToDown);
                    this.jumpTime = 0;
                }
                this.jumpTime++;
                if (this.actionName == Frog.ACTIONS.jump) {
                    this.speedY -= this.acceleratedY * this.jumpTime;
                } else {
                    this.speedY -= this.acceleratedY * this.jumpTime;
                }
            } else if (this.speedY != 0) {
                this.speedY = 0;
                this.speedX = 0;
                this.y = this.beginPos.y;
            }
        }
        //小跳
        jumpSmall() {
            this.speedX = 10;
            this.jumpHeight = 40;
            this.jumpOperate(GameConfig.SMALLSTEP);
        }
        //大跳
        jumbBig() {
            this.speedX = 20;
            this.jumpHeight = 80;
            this.jumpOperate(GameConfig.BIGSTEP);
        }
        //跳跃操作
        jumpOperate(setpWidth) {
            this.jumpTime = 0;
            this.acceleratedY = 8 * this.jumpHeight * this.speedX * this.speedX / (setpWidth * setpWidth);
            this.speedY = 2 * this.acceleratedY * setpWidth / this.speedX;
            this.playAnimation(Frog.ACTIONS.jump);
        }
    }

}