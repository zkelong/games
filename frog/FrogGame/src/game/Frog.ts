
namespace game {

    /**
     * 青蛙
     */
    import Sprite = Laya.Sprite;
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

        speedX: number = 0;      //速度X
        speedY: number = 0;      //速度Y
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
    }

}